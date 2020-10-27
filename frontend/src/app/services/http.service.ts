import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from "@angular/forms";
import { ConfigurationService } from "./configuration.service";

const stage1Route: string = "stage1/predict";
const stage2Route: string = "stage2/predict";
const stage3Route: string = "stage3/predict";

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  formGroup: FormGroup;
  stage1Url: string;
  stage2Url: string;
  stage3Url: string;

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
        this.stage3Url = configObject.backend.stage2_url; // TODO: This should be a separate entry in the config (github secret, config.json etc.)
      });
    }

  lungSegmentation(file: File) {
    // fill form with data    
    this.formGroup.get('img').setValue(file);
    let formData: FormData = new FormData();
    formData.append("img", this.formGroup.get('img').value);

    // Rest Client call
    return this.http.post(this.stage1Url + stage1Route, formData, { responseType: "arraybuffer"});
  }

  pneumoniaClassification(mask: File) {
    // fill form with data    
    this.formGroup.get('mask').setValue(mask);
    let formData: FormData = new FormData();
    formData.append("img", this.formGroup.get('img').value);
    formData.append("mask", this.formGroup.get('mask').value);

    return this.http.post(this.stage2Url + stage2Route, formData, { responseType: "json" });
  }

  viralClassification(mask: File) {
    // fill form with data    
    this.formGroup.get('mask').setValue(mask);
    let formData: FormData = new FormData();
    formData.append("img", this.formGroup.get('img').value);
    formData.append("mask", this.formGroup.get('mask').value);

    return this.http.post(this.stage3Url + stage3Route, formData, { responseType: "json" });
  }
}