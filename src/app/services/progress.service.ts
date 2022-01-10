import { Injectable } from '@angular/core';
import { NgProgress, NgProgressRef } from 'ngx-progressbar';

@Injectable({
  providedIn: 'root',
})
export class ProgressBarService {
  progressRef!: NgProgressRef;
  constructor() {}

  startLoading() {
    this.progressRef.start();
  }

  completeLoading() {
    this.progressRef.complete();
  }

  changeProgressColor(color: string) {
    this.progressRef.setConfig({ color });
  }
}
