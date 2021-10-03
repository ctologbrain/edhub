import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/_core/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: any;
  constructor(private _user: UserService, private _router: Router) {}

  ngOnInit(): void {
    this._user.authUser.subscribe((data) => {
      this.user = data;
    });
  }

  logout() {
    this._user.authState.next(false);
    this._user.authUser.next({});
    localStorage.removeItem(environment.tokenType);
    this._router.navigate(['/']);
  }
}
