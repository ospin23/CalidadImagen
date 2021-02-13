import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Base64Service {

  constructor() { }

  async base64Enconde(file: File): Promise<any> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }
}
