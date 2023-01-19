import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
} from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    if (localStorage.getItem('jwt')) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        },
      });
    }

    return next.handle(request);
  }
}
