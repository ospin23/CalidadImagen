import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastMessageService {

  constructor(private toastr: ToastrService) { }

  showSuccess(message: string, properties?: any) {
    this.toastr.success(message);
  }

  showError(message: string, properties?: any) {
    this.toastr.error(message);
  }
  clear() {
    this.toastr.clear();
  }
}
