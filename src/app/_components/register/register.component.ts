import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { CustomValidators } from 'src/app/_core/helpers/custom-validators';
import { UserService } from 'src/app/_core/services/user.service';
declare let $: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  registering = new BehaviorSubject(false);
  constructor(
    private _builder: FormBuilder,
    private _userService: UserService,
    private _toast: ToastrService
  ) {
    this.registerForm = this._builder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      cpassword: [
        '',
        [Validators.required, CustomValidators.mustMatch('password')],
      ],
      phone: ['', [CustomValidators.isMobile()]],
    });
  }

  ngOnInit(): void {}

  /**
   * Register User
   */
  async register() {
    console.log(this.registerForm.value);
    this.registerForm.markAllAsTouched();
    /* Check form is valid */
    if (this.registerForm.valid) {
      /* Start Loader */
      this.registering.next(true);
      let res = await this._userService.signup(this.registerForm.value);
      this.registering.next(false);
      if (res.status == 'true') {
        this._toast.success(res.msg);
        $('.modal').modal('hide');
      } else if (res.status == 'false') {
        this._toast.error(res.msg);
      }
    }
  }
}
