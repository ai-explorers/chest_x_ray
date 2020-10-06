import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";
import { ConfigObject } from "../models/configObject";

@Injectable({
  providedIn: 'root',
})
export class YamlService {
  
  constructor(private http: HttpClient) { }

  /**
  * Parses a YAML file into an object 
  * 
  * IMPORTANT: root directory has to be /assets/
  * @param file relative path + file name
  * @returns an Observable that returns a ConfigObject containing the parsed configuration
  */
  loadYaml(file: string): Observable<ConfigObject> {
    return this.http.get(`/assets/${file}`, { responseType: 'text' }).pipe(map(response => {
      let lines: string[] = response.split('\n');  // create array where each YAML line is one entry
      let object: ConfigObject = {
        backend_url: ""
      };
      lines.forEach((line: string) => {
        let delimiter = line.indexOf(':');  // find the colon position inside the line string 
        let key = line.substr(0, delimiter);  // extract the key (everything before the colon)
        let value = line.substr(delimiter + 2);  // extract the value (everything after the colon)
        object[key] = value;  // add a new key-value pair to the object
      });
      return object;
    }));
  }
}