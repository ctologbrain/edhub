import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private _user: UserService, private route: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (localStorage.getItem(environment.tokenType)) {
      if (!this._user.authState.getValue()) {
        this._user.authState.next(true);
        this._user.authuser().then((res: any) => {
          if (res.status == 'true') {
            this._user.authUser.next(res.data);
          } else {
            localStorage.removeItem(environment.tokenType);
            this._user.authState.next(false);
            this._user.authUser.next(null);
          }
        });
      }
    }
    return true;
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (localStorage.getItem(environment.tokenType)) {
      if (!this._user.authState.getValue()) {
        this._user.authState.next(true);
        this._user.authuser().then((res: any) => {
          if (res.status == 'true') {
            this._user.authUser.next(res.data);
          } else {
            localStorage.removeItem(environment.tokenType);
            this._user.authState.next(false);
            this._user.authUser.next(null);
          }
        });
      }
    }
    return true;
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (localStorage.getItem(environment.tokenType)) {
      if (!this._user.authState.getValue()) {
        this._user.authState.next(true);
        this._user.authuser().then((res: any) => {
          if (res.status == 'true') {
            this._user.authUser.next(res.data);
          } else {
            localStorage.removeItem(environment.tokenType);
            this._user.authState.next(false);
            this._user.authUser.next(null);
          }
        });
        return true;
      }
      return true;
    }
    this.route.navigate(['/']);
    return false;
  }
}
