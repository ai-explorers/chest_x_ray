import { Injectable, SecurityContext } from '@angular/core';
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";

/**
 * Service for performing data type conversions
 * 
 * @method `arrayBufferToUrlString(arrayBuffer)` - converts an `ArrayBuffer` of an image into a base64 formatted url `string`
 * @method `fileToUrlString(file)` - converts a `File` into a `SafeUrl` resource string
 * @method `arrayBufferToFile(buffer)` - converts an `ArrayBuffer` of an image into a `File`
 */
@Injectable({
  providedIn: 'root',
})
export class ConversionService {

  constructor(private domSanitizer: DomSanitizer) { }

  /**
  * Converts an `ArrayBuffer` of an image into a base64 formatted url `string`
  * 
  * @param arrayBuffer image to be converted
  * @returns the base64 encoded string representing the image
  */
  arrayBufferToUrlString(arrayBuffer: ArrayBuffer): string {
    let binary = '';
    let bytes = new Uint8Array(arrayBuffer);
    for (var i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return "data:image/jpg;base64," + window.btoa(binary);
  }

  /**
  * Converts a `File` into a `SafeUrl` resource string
  * 
  * @param file image or file to be converted
  * @returns object url / string
  */
  fileToUrlString(file: File): SafeUrl {
    return this.domSanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file));
  }

  /**
  * Converts an `ArrayBuffer` of an image into a `File`
  * 
  * @param buffer ArrayBuffer to be converted
  * @param name (optional) name of the returned file, default: "mask.jpg"
  * @param typeString (optional) MIME type of the returned file, default: "image/jpg"
  * @returns file containing the buffer, name and type
  */
  arrayBufferToFile(buffer: ArrayBuffer, name: string = "mask.jpg", typeString: string = "image/jpg"): File {
    return new File([buffer], name, {
      type: typeString,
    });
  }

}