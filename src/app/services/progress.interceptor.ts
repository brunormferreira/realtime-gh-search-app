import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { ProgressBarService } from './progress.service';

@Injectable()
export class ProgressInterceptor implements HttpInterceptor {
  constructor(private progressBarService: ProgressBarService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.progressBarService.startLoading();
    return next
      .handle(request)
      .pipe(finalize(() => this.progressBarService.completeLoading()));
  }
}
