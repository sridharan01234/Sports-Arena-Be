import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {


  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const myresponse = sessionStorage.getItem('token');
    console.log(myresponse);
    if (myresponse) {
  
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${myresponse}`,
         
        },
      });
    }

    return next.handle(request);
  }
}
