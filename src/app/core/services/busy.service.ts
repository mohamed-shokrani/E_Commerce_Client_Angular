import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root',
})
export class BusyService {
  busyRequestCounts: number = 0;

  constructor(private spinnerService: NgxSpinnerService) {}
  busy() {
    this.busyRequestCounts++;
    this.spinnerService.show(undefined, {
      type: 'ball-beat',
      bdColor: 'rgba(255,255,255,0.7)',
      color: 'green',
    });
  }
  idle() {
    this.busyRequestCounts--;
    if (this.busyRequestCounts >= 0) {
      this.spinnerService.hide();
    }
  }
}
