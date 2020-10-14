import { Injectable, SecurityContext } from '@angular/core';
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";

@Injectable({
  providedIn: 'root',
})
export class ConversionService {
  

  constructor(private domSanitizer: DomSanitizer) { }

  arrayBufferToUrlString(arrayBuffer: ArrayBuffer): string {
    let binary = '';
    let bytes = new Uint8Array(arrayBuffer);
    for (var i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return "data:image/jpg;base64," + window.btoa(binary);
  }

  fileToUrlString(file: File): SafeUrl {
    return this.domSanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file));
  }

}