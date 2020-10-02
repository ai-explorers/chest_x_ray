import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) { }

  lungSegmentation(file: File): File {
    // TODO call Rest API
    let result: File = null;
    return result;
  }
}