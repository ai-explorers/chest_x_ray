import { Component, OnInit } from '@angular/core';
import { HttpService } from "../../services/http.service";
import { ConversionService } from "../../services/conversion.service";
import { SafeUrl } from "@angular/platform-browser";
import { forkJoin } from 'rxjs';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-file-analysis',
  templateUrl: './file-analysis.component.html',
  styleUrls: ['./file-analysis.component.scss']
})
export class FileAnalysisComponent implements OnInit {

  public canvasWidth = 200
  public optionsPneumoniaGauge = {
    hasNeedle: true,
    outerNeedle: true,
    needleColor: "black",
    needleStartValue: 50,
    arcColors: ["rgb(61,204,91)","rgb(239,214,19)","rgb(255,84,84)"],
    arcDelimiters: [25,75],
    rangeLabel: ["normal","pneumonia"],
  }
  public optionsViralGauge = {
    hasNeedle: true,
    outerNeedle: true,
    needleColor: "black",
    needleStartValue: 50,
    arcColors: ['lightgray'],
    arcDelimiters: [25,75],
    rangeLabel: ["bacterial","viral"],
  }

  results: {
    title: string,
    url: string,
    urlOriginal: SafeUrl,
    pneumoniaResult: string,
    pneumoniaPredictionValue: number,
    viralResult: string,
    viralPredictionValue: number,
   }[] = [];

  constructor(private httpService: HttpService,
    private conversionService: ConversionService,
    private spinnerService: NgxSpinnerService) { }

  ngOnInit(): void {
  }

  handleFileUpload(files: FileList) {
    // display spinner
    this.results.push({
      title: files.item(0).name,
      url: null,
      urlOriginal: null,
      pneumoniaResult: null,
      pneumoniaPredictionValue: null,
      viralResult: null,
      viralPredictionValue: null
    });
    
    this.spinnerService.show();
    
    this.httpService.lungSegmentation(files.item(0))
    .subscribe((segmentationRes: ArrayBuffer) => {
      // display stage1 result
      this.spinnerService.hide();
      console.log("Stage1: Lung segmentation was successful.");
      this.updateLatestResult({
        title: files.item(0).name,
        url: this.conversionService.arrayBufferToUrlString(segmentationRes),
        urlOriginal: this.conversionService.fileToUrlString(files.item(0)),
        pneumoniaResult: null,
        pneumoniaPredictionValue: null,
        viralResult: null,
        viralPredictionValue: null
      });
      this.spinnerService.show();
      // simultaneous http calls for pneumonia and viral classification
      // TODO: forkJoin only returns if both calls return! If stage2 or stage3 is unavailable, no result gets displayed! Use a mechanism like mergeMap here, so it's okay if only one call returns.
      forkJoin([
        this.httpService.pneumoniaClassification(this.conversionService.arrayBufferToFile(segmentationRes)),
        this.httpService.viralClassification(this.conversionService.arrayBufferToFile(segmentationRes)),
      ])
      .subscribe(([pneumoniaRes, viralRes]: [any, any]) => {
        this.spinnerService.hide();
        console.log("Stage2&3: Pneumonia and viral classification was successful.");
        console.log("Pneumonia result and prediction value: " + pneumoniaRes.result + ", " + pneumoniaRes.prediction_value);
        console.log("Viral result and prediction value: " + viralRes.result + ", " + viralRes.prediction_value);
        // TODO: Match object structures and use updateLatestResult instead of manually updating
        let currentResult = this.results.pop();
        currentResult.pneumoniaResult = pneumoniaRes.result;
        currentResult.pneumoniaPredictionValue = Math.round(pneumoniaRes.prediction_value * 100);
        currentResult.viralResult = viralRes.result;
        currentResult.viralPredictionValue = Math.round(viralRes.prediction_value * 100);
        this.results.push(currentResult);
      },
      err => {
        console.log("Error during pneumonia and viral classification!");
        console.log(err);
      });
    });
  }

  private updateLatestResult(newResult: any): void {
    let latestResult = this.results.pop();
    for (const key in latestResult) {
      if (latestResult.hasOwnProperty(key)) {
        if (newResult.hasOwnProperty(key) && newResult[key] != null) {
          latestResult[key] = newResult[key];
        }
      }
    }
    this.results.push(latestResult);
  }

}
