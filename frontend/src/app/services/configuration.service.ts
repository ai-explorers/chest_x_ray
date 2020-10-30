import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";
import { ConfigObject } from "../models/configObject";

const basePath: string = "/assets/config/";

/**
 * Service for handling frontend configuration and parsing config.json
 * 
 * @method `loadConfig(filePath)` - loads and parses a config file into an object
 */
@Injectable({
  providedIn: 'root',
})
export class ConfigurationService {
  
  constructor(private http: HttpClient) { }

  /**
  * Loads and parses a config file into an object 
  * 
  * IMPORTANT: root directory has to be /assets/config/
  * @param file relative path + file name
  * @returns an observable for an object containing the parsed configuration
  */
  loadConfig(filePath: string): Observable<ConfigObject> {
    return this.http.get(`${basePath + filePath}`, { responseType: 'json' }).pipe(map(response => {
      let config: ConfigObject = <ConfigObject>response;
      return config;
    }));
  }
}