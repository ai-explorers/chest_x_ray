import { Component, OnInit } from '@angular/core';
import { HttpService } from "../../services/http.service";
import { ConversionService } from "../../services/conversion.service";
import { SafeUrl } from "@angular/platform-browser";

@Component({
  selector: 'app-file-analysis',
  templateUrl: './file-analysis.component.html',
  styleUrls: ['./file-analysis.component.scss']
})
export class FileAnalysisComponent implements OnInit {

  segmentationResults: { title: string, url: string, urlOriginal: SafeUrl }[] = [];

  constructor(private httpService: HttpService,
    private conversionService: ConversionService) { }

  ngOnInit(): void {
  }

  handleFileUpload(files: FileList) {
    this.httpService.lungSegmentation(files.item(0)).subscribe(
      (res) => {
        console.log("Lung segmentation was successful.");
        this.segmentationResults.push({
          title: files.item(0).name,
          url: this.conversionService.arrayBufferToUrlString(res),
          urlOriginal: this.conversionService.fileToUrlString(files.item(0))
        });
      },
      (err) => {
        console.log("Error");
        console.log(err);
      }
    );
  }

}
