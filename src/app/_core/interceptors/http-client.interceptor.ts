import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpParams,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
// import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
// import { environment } from '@environments/environment';
const serverUrl = environment.server_url;
@Injectable()
export class HttpClientInterceptor {
  /**
   *
   * @param http http client to send and get requests
   * @param _router router for check url
   */
  constructor(private http: HttpClient, private _router: Router) {}

  /**
   *
   * @param error http error response
   * @returns array
   */
  private formatErrors(error: HttpErrorResponse) {
    if (error.status === 0) {
      this.sendMessage(
        'Something went wrong please try again after some time.'
      );
      return of([]);
    }
    if (error.status === 401) {
      localStorage.removeItem('ACCESS_TOKEN');
      localStorage.removeItem('EXPIRES_AT');
      this._router.navigate(['/auth'], {
        queryParams: { returnUrl: this._router.url },
      });
      return of([]);
    }
    if (error.status === 500) {
      this.sendMessage('Internal Server Error');
      return of([]);
    }
    this.sendMessage(error.error.message);
    return of([]);
  }

  /**
   *
   * @param path string
   * @param params httpparams
   * @returns Observable
   */
  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http
      .get(`${serverUrl}${path}`, { params })
      .pipe(catchError((err) => this.formatErrors(err)));
  }

  /**
   *
   * @param path string
   * @param params httpparams
   * @returns Observable
   */
  getWithoutBase(
    path: string,
    params: HttpParams = new HttpParams()
  ): Observable<any> {
    return this.http
      .get(`${path}`, { params })
      .pipe(catchError((err) => this.formatErrors(err)));
  }

  /**
   *
   * @param path string
   * @param body body of data
   * @param header token or any type of data
   * @returns Observable
   */
  put(path: string, body: Object = {}, header?: any): Observable<any> {
    return this.http
      .put(`${serverUrl}${path}`, body, header)
      .pipe(catchError((err) => this.formatErrors(err)));
  }

  /**
   *
   * @param path string
   * @param body object of data
   * @param header object of header data
   * @returns Observable
   */
  post(path: string, body: Object = {}, header?: any): Observable<any> {
    return this.http
      .post(`${serverUrl}${path}`, body, header)
      .pipe(catchError((err) => this.formatErrors(err)));
  }

  /**
   *
   * @param path string
   * @param body object for update data
   * @param header object of header data
   * @returns Observable
   */
  patch(path: string, body: Object = {}, header?: any): Observable<any> {
    return this.http
      .patch(`${serverUrl}${path}`, body, header)
      .pipe(catchError((err) => this.formatErrors(err)));
  }

  /**
   *
   * @param path string
   * @returns Observable
   */
  delete(path: string): Observable<any> {
    return this.http
      .delete(`${serverUrl}${path}`)
      .pipe(catchError((err) => this.formatErrors(err)));
  }

  /**
   *
   * @param msg string of message
   */
  sendMessage(msg: any) {
    console.log(msg);
    // this._toast.error(msg);
    // this._snackBar.open(msg,"Ok", {
    //   duration: 2000,
    //   horizontalPosition:'right',
    //   verticalPosition:'bottom'
    // })
  }
}
