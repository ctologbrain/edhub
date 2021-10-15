import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClientInterceptor } from '../interceptors/http-client.interceptor';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  productDetailLinks = new BehaviorSubject({ internal: [], external: '' });
  constructor(private _http: HttpClientInterceptor) {}

  getCourses(params: HttpParams): Promise<any> {
    return this._http.post('/CourseByCategory', params).toPromise();
  }

  getCourseDetails(params: any): Promise<any> {
    return this._http.post('/ProductDetails', params).toPromise();
  }
}
