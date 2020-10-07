import { Component, OnInit } from '@angular/core';
import { HttpService } from "../../services/http.service";
import { ConversionService } from "../../services/conversion.service";

@Component({
  selector: 'app-file-analysis',
  templateUrl: './file-analysis.component.html',
  styleUrls: ['./file-analysis.component.scss']
})
export class FileAnalysisComponent implements OnInit {

  segmentationResults: { title: string, url: string }[] = [];

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
          url: this.conversionService.arrayBufferToUrlString(res)
        });
      },
      (err) => {
        console.log("Error");
        console.log(err);
      }
    );
  }

}
