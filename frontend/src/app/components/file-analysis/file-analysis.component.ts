import { Component, OnInit } from '@angular/core';
import { HttpService } from "../../services/http.service";

@Component({
  selector: 'app-file-analysis',
  templateUrl: './file-analysis.component.html',
  styleUrls: ['./file-analysis.component.scss']
})
export class FileAnalysisComponent implements OnInit {

  urls: Array<string> = new Array<string>();

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
  }

  handleFileUpload(files: FileList) {
    this.httpService.lungSegmentation(files.item(0)).subscribe(
      (res) => {
        console.log("Lung segmentation was successful.");
        
        let binary = '';
        let bytes = new Uint8Array(res);
        for (var i = 0; i < bytes.byteLength; i++) {
          binary += String.fromCharCode( bytes[ i ] );
        }
        this.urls.push("data:image/jpg;base64," + window.btoa(binary));
      },
      (err) => {
        console.log("Error");
        console.log(err);
      }
    );
  }

}
