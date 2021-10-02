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
    if (localStorage.getItem('xsrf')) {
      if (!this._user.authState.getValue()) {
        this._user.authState.next(true);
        // this._user.authuser().then((res: any) => {
        //   if (res.status && res.user) {
        //     this._user.authUser.next(res.user);
        //   } else {
        //     localStorage.removeItem('xsrf');
        //     this._user.authState.next(false);
        //     this._user.authUser.next({});
        //   }
        // });
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
    if (localStorage.getItem('xsrf')) {
      if (!this._user.authState.getValue()) {
        this._user.authState.next(true);
        // this._user.authuser().then((res: any) => {
        //   if (res.status && res.user) {
        //     this._user.authUser.next(res.user);
        //   } else {
        //     localStorage.removeItem('xsrf');
        //     this._user.authState.next(false);
        //     this._user.authUser.next({});
        //   }
        // });
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
    if (localStorage.getItem('xsrf')) {
      if (!this._user.authState.getValue()) {
        this._user.authState.next(true);
        // this._user.authuser().then((res: any) => {
        //   if (res.status && res.user) {
        //     this._user.authUser.next(res.user);
        //   } else {
        //     localStorage.removeItem('xsrf');
        //     this._user.authState.next(false);
        //     this._user.authUser.next({});
        //   }
        // });
        return true;
      }
      return true;
    }
    this.route.navigate(['/']);
    return false;
  }
}
