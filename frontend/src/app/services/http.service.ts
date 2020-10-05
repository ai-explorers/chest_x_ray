import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from "@angular/forms";

const backendUrl: URL = new URL("http://127.0.0.1:5000/stage1/predict");

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  formGroup: FormGroup;

  constructor(private http: HttpClient,
    public formBuilder: FormBuilder) {
      // simulate multipart form, this also takes care of http headers
      this.formGroup = this.formBuilder.group({
        img: [null]
      })
     }

  lungSegmentation(file: File) {
    // fill form with data    
    this.formGroup.get('img').setValue(file);
    let formData: FormData = new FormData();
    formData.append("img", this.formGroup.get('img').value);

    // Rest Client call
    return this.http.post(backendUrl.toString(), formData, { responseType: "arraybuffer"});
  }
}