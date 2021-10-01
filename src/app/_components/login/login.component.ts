import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/_core/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    private _builder: FormBuilder,
    private _userService: UserService,
    private _router: Router,
    private _toast: ToastrService
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
      let res = await this._userService.login(this.loginForm.value);
      if (res.status == true) {
        localStorage.setItem('xsrf', res.token);
        this._router.navigate(['/']);
      } else if (res.status == 'false') {
        this._toast.error(res.msg);
      }
    }
  }
}
