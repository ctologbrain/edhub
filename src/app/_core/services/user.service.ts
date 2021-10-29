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
   * @function login for login user
   * @param {Auth} user user email & password to validare user
   */
  sociallogin(user: object): Promise<any> {
    return this._http.post(`/googlesignup`, user).toPromise();
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
  removeToWishList(course_id: number): Promise<any> {
    return this._http.post(`/DeletedWishList`, { course_id }).toPromise();
  }

  /**
   * @function removeToWishList for get authenticated user user
   */
  getWishList(): Promise<any> {
    return this._http.get(`/GetWishList`).toPromise();
  }

  /**
   * @function AddToCompare
   */
  addToCompare(course_id: number): Promise<any> {
    return this._http.post(`/AddToCompare`, { course_id }).toPromise();
  }

  /**
   * @function removeToCompare for get authenticated user user
   */
  removeToCompare(course_id: number): Promise<any> {
    return this._http.post(`/DeletedCompare`, { course_id }).toPromise();
  }

  /**
   * @function removeToWishList for get authenticated user user
   */
  getCompare(): Promise<any> {
    return this._http.get(`/GetCompare`).toPromise();
  }

  /**
   * @function removeToWishList for get authenticated user user
   */
  updateProfile(profile: any): Promise<any> {
    return this._http.post(`/updateprofile`, profile).toPromise();
  }

  /**
   * @function removeToWishList for get authenticated user user
   */
  updateUserDetail(formData: any): Promise<any> {
    return this._http.post(`/updateUserdetails`, formData).toPromise();
  }
}
