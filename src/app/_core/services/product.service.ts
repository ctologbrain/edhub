import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClientInterceptor } from '../interceptors/http-client.interceptor';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private _http: HttpClientInterceptor) {}

  getCourses(params: HttpParams): Promise<any> {
    return this._http.post('/CourseByCategory', params).toPromise();
  }
}
