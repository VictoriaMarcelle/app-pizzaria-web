import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token/token.service';

@Injectable()
export class Interceptors implements HttpInterceptor {
  constructor(private tokenService: TokenService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (this.tokenService.hasToken()) {
      const token = this.tokenService.getToken();
      const headers = new HttpHeaders().append('Authorization', `Bearer ${token}`);

      request = request.clone({ headers });
    }

    return next.handle(request);
  }
}
