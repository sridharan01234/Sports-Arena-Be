import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

  constructor(private cookieService: CookieService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          console.log(event.headers)
          // Log all headers
          // console.log('Response Headers:', event.headers.keys().map(key => ({
          //   key,
          //   value: event.headers.get(key)
          // })));
        }
      })
    );
  }
}
