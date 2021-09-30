import { Injectable } from '@angular/core';
import { HttpClientInterceptor } from '../interceptors/http-client.interceptor';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor(private _http: HttpClientInterceptor) {}

  getCategories() {
    return this._http.get('/homecategory').toPromise();
  }
}
