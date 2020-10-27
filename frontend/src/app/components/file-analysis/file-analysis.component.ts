import { Component, OnInit } from '@angular/core';
import { HttpService } from "../../services/http.service";
import { ConversionService } from "../../services/conversion.service";
import { SafeUrl } from "@angular/platform-browser";
import { tap, concatMap, mergeMap } from "rxjs/operators";
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-file-analysis',
  templateUrl: './file-analysis.component.html',
  styleUrls: ['./file-analysis.component.scss']
})
export class FileAnalysisComponent implements OnInit {

  segmentationResults: {
    title: string,
    url: string,
    urlOriginal: SafeUrl,
    pneumoniaResult: string,
    pneumoniaPredictionValue: number,
    viralResult: string,
    viralPredictionValue: number,
   }[] = [];

  constructor(private httpService: HttpService,
    private conversionService: ConversionService) { }

  ngOnInit(): void {
  }

  handleFileUpload(files: FileList) {
    this.httpService.lungSegmentation(files.item(0))
    .subscribe((segmentationRes: ArrayBuffer) => {
      // display stage1 result
      console.log("Stage1: Lung segmentation was successful.");
      this.segmentationResults.push({
        title: files.item(0).name,
        url: this.conversionService.arrayBufferToUrlString(segmentationRes),
        urlOriginal: this.conversionService.fileToUrlString(files.item(0)),
        pneumoniaResult: null,
        pneumoniaPredictionValue: null,
        viralResult: null,
        viralPredictionValue: null
      });
      // simultaneous http calls for pneumonia and viral classification
      // TODO: forkJoin only returns if both calls return! If stage2 or stage3 is unavailable, no result gets displayed! Use a mechanism like mergeMap here, so it's okay if only one call returns.
      forkJoin([
        this.httpService.pneumoniaClassification(this.conversionService.arrayBufferToFile(segmentationRes)),
        this.httpService.viralClassification(this.conversionService.arrayBufferToFile(segmentationRes)),
      ])
      .subscribe(([pneumoniaRes, viralRes]: [any, any]) => {
        console.log("Stage2&3: Pneumonia and viral classification was successful.");
        console.log("Pneumonia result and prediction value: " + pneumoniaRes.result + ", " + pneumoniaRes.prediction_value);
        console.log("Viral result and prediction value: " + viralRes.result + ", " + viralRes.prediction_value);
        let currentResult = this.segmentationResults.pop();
        currentResult.pneumoniaResult = pneumoniaRes.result;
        currentResult.pneumoniaPredictionValue = Math.round(pneumoniaRes.prediction_value * 100);
        currentResult.viralResult = viralRes.result;
        currentResult.viralPredictionValue = Math.round(viralRes.prediction_value * 100);
        this.segmentationResults.push(currentResult);
      },
      err => {
        console.log("Error during pneumonia and viral classification!");
        console.log(err);
      });
    });
  }
}
