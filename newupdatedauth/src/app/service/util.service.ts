import {Injectable} from "@angular/core";

@Injectable({providedIn: 'root'})
export class UtilService {

  constructor() {
  }


   fromByteArray(bytes: Uint8Array) {
    let binary = '';
    let len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode( bytes[ i ] );
    }
    const base64String = window.btoa( binary );
  
    // convert from base64 to base64 url encoding
    let result = base64String
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');
  
    return result;
  }
  
   toByteArray(base64String: string){
    console.log(base64String)
  
    // Replace non-url compatible chars with base64 standard chars
    let input = base64String
        .replace(/-/g, '+')
        .replace(/_/g, '/');
  
    // Pad out with standard base64 required padding characters
    const pad = input.length % 4;
    if(pad) {
        if(pad === 1) {
            throw new Error('InvalidLengthError: Input base64url string is the wrong length to determine padding');
        }
        input += new Array(5-pad).join('=');
    }
    return  Uint8Array.from(window.atob(input), c=>c.charCodeAt(0))
  }

}
