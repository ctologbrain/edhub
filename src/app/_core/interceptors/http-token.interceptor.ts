import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
// import { AuthService } from 'src/app/core';

const TOKEN = 'x-access-token';
@Injectable({
  providedIn: 'root',
})
export class HttpTokenInterceptor implements HttpInterceptor {
  userToken: string | null = '';
  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (request.url.search(environment.server_url) >= 0) {
      this.userToken = localStorage.getItem(environment.tokenType);
      if (!request.headers.has(TOKEN) && this.userToken) {
        request = request.clone({
          setHeaders: {
            'x-access-token': `${this.userToken}`,
          },
        });
      }
      request = request.clone({
        headers: request.headers.set('Accept', 'application/json'),
      });
      // request = request.clone({
      //   headers: request.headers.set(environment.tokenType, '1136899373619364619174637293644'),
      // });
    }
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }
}
