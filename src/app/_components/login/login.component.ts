import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { UserService } from 'src/app/_core/services/user.service';
import { environment } from 'src/environments/environment';
declare let $: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loggingIn = new BehaviorSubject(false);
  constructor(
    private _builder: FormBuilder,
    private _userService: UserService,
    private _toast: ToastrService,
    private _router: Router
  ) {
    this.loginForm = this._builder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  /**
   * Login User
   */
  async login() {
    this.loginForm.markAllAsTouched();
    /* Check form is valid */
    if (this.loginForm.valid) {
      /* Start Loader */
      this.loggingIn.next(true);
      let res = await this._userService.login(this.loginForm.value);
      this.loggingIn.next(false);
      if (res.status == 'true') {
        localStorage.setItem(environment.tokenType, res.token);
        this._userService.authState.next(true);
        $('.modal').modal('hide');
        this._router.navigate(['/account']);
      } else if (res.status == 'false') {
        this._toast.error(res.msg);
      }
    }
  }
}
