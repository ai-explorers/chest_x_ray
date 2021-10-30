import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from "@angular/forms";
import { ConfigurationService } from "./configuration.service";
import { Observable } from 'rxjs';

const stage1Route: string = "predict";
const stage2Route: string = "predict";
const stage3Route: string = "predict";

/**
 * Service for http calls to backend
 * 
 * @method `lungSegmentation(file)` - sends a http post request for stage1 to backend
 * @method `pneumoniaClassification(mask)` - sends a http post request for stage2 to backend
 * @method `viralClassification(mask)` - sends a http post request for stage3 to backend
 */
@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private formGroup: FormGroup;
  private stage1Url: string;
  private stage2Url: string;
  private stage3Url: string;

  constructor(private http: HttpClient,
    public formBuilder: FormBuilder,
    private configService: ConfigurationService) {
    // simulate multipart form, this also takes care of http headers
    this.formGroup = this.formBuilder.group({
      img: [null],
      mask: [null]
    });
    this.configService.loadConfig('config.json').subscribe(configObject => {
      this.stage1Url = configObject.backend.stage1_url;
      this.stage2Url = configObject.backend.stage2_url;
      this.stage3Url = configObject.backend.stage3_url;
    });
  }

  /**
  * Sends a http post request for stage1 (lung segmentation) to backend
  * 
  * @param file chest-x-ray image to be segmented
  * @returns an observable containing the cutout
  */
  lungSegmentation(file: File): Observable<ArrayBuffer> {
    // fill form with data    
    this.formGroup.get('img').setValue(file);
    let formData: FormData = new FormData();
    formData.append("img", this.formGroup.get('img').value);

    // Rest Client call
    return this.http.post(this.stage1Url + stage1Route, formData, { responseType: "arraybuffer"});
  }

  /**
  * Sends a http post request for stage2 (pneumonia classification) to backend
  * 
  * @param mask result of stage1 (lung cutout)
  * @returns an observable containing the classification results
  */
  pneumoniaClassification(mask: File): Observable<Object> {
    // fill form with data    
    this.formGroup.get('mask').setValue(mask);
    let formData: FormData = new FormData();
    formData.append("img", this.formGroup.get('img').value);
    formData.append("mask", this.formGroup.get('mask').value);

    return this.http.post(this.stage2Url + stage2Route, formData, { responseType: "json" });
  }

  /**
  * Sends a http post request for stage3 (viral classification) to backend
  * 
  * @param mask result of stage1 (lung cutout)
  * @returns an observable containing the classification results
  */
  viralClassification(mask: File): Observable<Object> {
    // fill form with data    
    this.formGroup.get('mask').setValue(mask);
    let formData: FormData = new FormData();
    formData.append("img", this.formGroup.get('img').value);
    formData.append("mask", this.formGroup.get('mask').value);

    return this.http.post(this.stage3Url + stage3Route, formData, { responseType: "json" });
  }
}