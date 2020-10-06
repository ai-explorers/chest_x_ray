import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConversionService {
  
  constructor() { }

  arrayBufferToUrlString(arrayBuffer: ArrayBuffer): string {
    let binary = '';
    let bytes = new Uint8Array(arrayBuffer);
    for (var i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return "data:image/jpg;base64," + window.btoa(binary);
  }
}