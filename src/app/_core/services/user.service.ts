import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClientInterceptor } from '../interceptors/http-client.interceptor';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  authUser = new BehaviorSubject<any>(null);
  authState = new BehaviorSubject<boolean>(false);
  constructor(private _http: HttpClientInterceptor) {}

  /**
   * @function login for login user
   * @param {Auth} user user email & password to validare user
   */
  login(user: object): Promise<any> {
    return this._http.post(`/login`, user).toPromise();
  }

  /**
   * @function signup for register user
   * @param {Auth} user user email & password to validare user
   */
  signup(user: object): Promise<any> {
    return this._http.post(`/Signup`, user).toPromise();
  }

  /**
   * @function authuser for get authenticated user user
   */
  authuser(): Promise<any> {
    return this._http.post(`/UserDetails`, {}).toPromise();
  }

  /**
   * @function addToWishList
   */
  addToWishList(course_id: number): Promise<any> {
    return this._http.post(`/AddToWishList`, { course_id }).toPromise();
  }

  /**
   * @function removeToWishList for get authenticated user user
   */
  removeToWishList(): Promise<any> {
    return this._http.post(`/DeletedWishList`, {}).toPromise();
  }
}
