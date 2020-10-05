import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { FormBuilder, FormGroup } from "@angular/forms";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'multipart/form-data'
  }),
  responseType: 'arraybuffer'
};
const headers = new HttpHeaders().set('Content-Type', 'multipart/form-data');

const backendUrl: URL = new URL("http://127.0.0.1:5000/stage1/predict");

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  
  formGroup: FormGroup;

  constructor(private http: HttpClient,
    public formBuilder: FormBuilder) {
      this.formGroup = this.formBuilder.group({
        img: [null]
      })
     }

  lungSegmentation(file: File) {
    
    this.formGroup.get('img').setValue(file);

    let formData: FormData = new FormData();
    formData.append("img", this.formGroup.get('img').value);
    
    this.http.post<ArrayBuffer>(backendUrl.toString(), formData).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  }
}