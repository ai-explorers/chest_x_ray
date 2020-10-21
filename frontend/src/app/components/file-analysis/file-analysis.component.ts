import { Component, OnInit } from '@angular/core';
import { HttpService } from "../../services/http.service";
import { ConversionService } from "../../services/conversion.service";
import { SafeUrl } from "@angular/platform-browser";
import { tap, concatMap } from "rxjs/operators";

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
    result: string,
    predictionValue: number,
   }[] = [];

  constructor(private httpService: HttpService,
    private conversionService: ConversionService) { }

  ngOnInit(): void {
  }

  handleFileUpload(files: FileList) {
    this.httpService.lungSegmentation(files.item(0))
      .pipe(
        tap((res: any) => {
          console.log("Stage1: Lung segmentation was successful.");
          this.segmentationResults.push({
            title: files.item(0).name,
            url: this.conversionService.arrayBufferToUrlString(res),
            urlOriginal: this.conversionService.fileToUrlString(files.item(0)),
            result: null,
            predictionValue: null
          });
        }),
        // using consecutive http calls, since they are depending on each other
        concatMap((res: ArrayBuffer) =>
          this.httpService.pneumoniaClassification(this.conversionService.arrayBufferToFile(res))
        ),
      )
      .subscribe((res: any) => {
        console.log("Stage2: Classification was successful.");
        console.log("Result and prediction value: " + res.result + ", " + res.prediction_value);
        let currentResult = this.segmentationResults.pop();
        currentResult.result = res.result;
        currentResult.predictionValue = Math.round(res.prediction_value * 100);
        this.segmentationResults.push(currentResult);
      });
  }
}
