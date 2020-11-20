import { Component, OnInit } from '@angular/core';
import { HttpService } from "../../services/http.service";
import { ConversionService } from "../../services/conversion.service";
import { GaugeChartOption } from "../../models/gaugeChartOption";
import { PredictionResult } from "../../models/predictionResult";
import { forkJoin } from 'rxjs';
import { NgxSpinnerService } from "ngx-spinner";
import { HttpClient } from "@angular/common/http";

const healthyImagePath: string = "/assets/demo-upload/healthy_lung.jpg";
const bacterialImagePath: string = "/assets/demo-upload/bacterial_pneumonia.jpg";

@Component({
  selector: 'app-file-analysis',
  templateUrl: './file-analysis.component.html',
  styleUrls: ['./file-analysis.component.scss']
})
export class FileAnalysisComponent implements OnInit {

  public canvasWidth: number = 200
  public optionsPneumoniaGauge: GaugeChartOption = {
    hasNeedle: true,
    outerNeedle: true,
    needleColor: "black",
    needleStartValue: 50,
    arcColors: ["rgb(61,204,91)","rgb(239,214,19)","rgb(255,84,84)"],
    arcDelimiters: [25,75],
    rangeLabel: ["normal","pneumonia"],
  }
  public optionsViralGauge: GaugeChartOption = {
    hasNeedle: true,
    outerNeedle: true,
    needleColor: "black",
    needleStartValue: 50,
    arcColors: ['lightgray'],
    arcDelimiters: [25,75],
    rangeLabel: ["bacterial","viral"],
  }

  results: Array<PredictionResult>;

  constructor(private httpService: HttpService,
    private httpClient: HttpClient,
    private conversionService: ConversionService,
    private spinnerService: NgxSpinnerService) { }

  ngOnInit(): void {
    this.results = new Array<PredictionResult>()
  }

  handleFileUpload(file: File) {
    // create and display new card
    let newResult: PredictionResult = {
      title: file.name,
    };
    this.results.push(newResult);
    
    // display spinner for stage1
    this.spinnerService.show();
    
    this.httpService.lungSegmentation(file)
    .subscribe((segmentationRes: ArrayBuffer) => {
      console.log("Stage1: Lung segmentation was successful.");
      this.spinnerService.hide();
      // display stage1 result
      newResult.urlCutout = this.conversionService.arrayBufferToUrlString(segmentationRes);
      newResult.urlImage = this.conversionService.fileToUrlString(file),
      this.results = this.updateLatestResult(this.results, newResult);
      // display spinner for stage2
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
        // scale prediction values from 0-1 to 0-100
        newResult.pneumoniaPredictionValue = Math.round(pneumoniaRes.prediction_value * 100);
        newResult.viralPredictionValue = Math.round(viralRes.prediction_value * 100);
        newResult.pneumoniaResult = pneumoniaRes.result;
        newResult.viralResult = viralRes.result;
        // update view
        this.results = this.updateLatestResult(this.results, newResult);
      },
      err => {
        console.log("Error during pneumonia and viral classification!");
        console.log(err);
      });
    });
  }

  private updateLatestResult(resultList: Array<PredictionResult>, newResult: PredictionResult): Array<PredictionResult> {
    let latestResult = resultList.pop();
    for (const key in latestResult) {
      if (latestResult.hasOwnProperty(key)) {
        if (newResult.hasOwnProperty(key) && newResult[key] != null && newResult[key] != undefined) {
          latestResult[key] = newResult[key];
        }
      }
    }
    resultList.push(latestResult);
    return resultList;
  }

  uploadDemoFiles() {
    this.httpClient.get(healthyImagePath, { responseType: 'arraybuffer' }).subscribe(response => {
      let healthyFile: File = this.conversionService.arrayBufferToFile(response, "healthy_lung.jpg");
      this.handleFileUpload(healthyFile)
    });
    setTimeout(() => {
      this.httpClient.get(bacterialImagePath, { responseType: 'arraybuffer' }).subscribe(response => {
        let healthyFile: File = this.conversionService.arrayBufferToFile(response, "bacterial_pneumonia.jpg");
        this.handleFileUpload(healthyFile)
      });
    }, 4000);
  }

}
