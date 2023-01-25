import { LocalStorageService } from './../view/login/service/local-storage.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private localStorageService: LocalStorageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url.includes('login')) {
      return next.handle(request);
    }
    const token = this.localStorageService.get('TOKEN');
    const headers = request.headers.set('Authorization', token);
    const requestClone = request.clone({
      headers,
    });
    return next.handle(requestClone);
  }
}
