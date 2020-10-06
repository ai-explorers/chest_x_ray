import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from "@angular/forms";
import { YamlService } from "./yaml.service";

const stage1Route: string = "stage1/predict";

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  formGroup: FormGroup;
  backendUrl: string;

  constructor(private http: HttpClient,
    public formBuilder: FormBuilder,
    private yamlService: YamlService) {
      // simulate multipart form, this also takes care of http headers
      this.formGroup = this.formBuilder.group({
        img: [null]
      });
      this.yamlService.loadYaml('config/config.yaml').subscribe(configObject => {
        this.backendUrl = configObject.backend_url;
      });
    }

  lungSegmentation(file: File) {
    // fill form with data    
    this.formGroup.get('img').setValue(file);
    let formData: FormData = new FormData();
    formData.append("img", this.formGroup.get('img').value);

    // Rest Client call
    return this.http.post(this.backendUrl + stage1Route, formData, { responseType: "arraybuffer"});
  }
}