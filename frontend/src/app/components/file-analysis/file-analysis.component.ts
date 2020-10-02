import { Component, OnInit } from '@angular/core';
import { HttpService } from "../../services/http.service";

@Component({
  selector: 'app-file-analysis',
  templateUrl: './file-analysis.component.html',
  styleUrls: ['./file-analysis.component.scss']
})
export class FileAnalysisComponent implements OnInit {

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
  }

  handleFileUpload(files: FileList) {
    let result: File = this.httpService.lungSegmentation(files.item(0));
  }

}
