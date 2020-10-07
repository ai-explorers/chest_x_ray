import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";
import { ConfigObject } from "../models/configObject";

@Injectable({
  providedIn: 'root',
})
export class ConfigurationService {
  
  constructor(private http: HttpClient) { }

  /**
  * Parses a config file into an object 
  * 
  * IMPORTANT: root directory has to be /assets/config/
  * @param file relative path + file name
  * @returns an Observable that returns a ConfigObject containing the parsed configuration
  */
  loadConfig(file: string): Observable<ConfigObject> {
    return this.http.get(`/assets/config/${file}`, { responseType: 'json' }).pipe(map(response => {
      let config: ConfigObject = <ConfigObject>response;
      return config;
    }));
  }
}