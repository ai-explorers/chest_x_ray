import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-file-analysis',
  templateUrl: './file-analysis.component.html',
  styleUrls: ['./file-analysis.component.scss']
})
export class FileAnalysisComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  handleFileUpload(files: FileList) {
    // TODO: Add Rest API call
    //files.item(0);
  }

}
