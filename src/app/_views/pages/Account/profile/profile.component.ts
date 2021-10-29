import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BaseFormData } from 'src/app/_core/helpers/base-form-data';
import { UserService } from 'src/app/_core/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: any;
  serverUrl = environment.server_url;
  profile: FormGroup;
  constructor(
    private _user: UserService,
    private _router: Router,
    private _toaster: ToastrService,
    private _formData: BaseFormData,
    private _builder: FormBuilder
  ) {
    this.profile = this._builder.group({
      firstname: [],
      phone: [],
      lastname: [],
      email: [],
    });
  }

  ngOnInit(): void {
    this._user.authUser.subscribe((data) => {
      if (!data) return;
      this.user = data;
      this.user.avatar =
        (this.user.avatar && `${this.serverUrl}/${this.user.avatar}`) ||
        'https://cdn.pixabay.com/photo/2015/03/04/22/35/head-659651_960_720.png';
      let name = this.user.name.split(' ') || ['', ''];
      console.log(this.user.email);
      this.profile.patchValue({
        email: this.user.email,
        firstname: name[0],
        lastname: name[1],
        phone: this.user.phone || '',
      });
      this.profile.get('email')?.disable();
    });
  }

  logout() {
    this._user.authState.next(false);
    this._user.authUser.next({});
    localStorage.removeItem(environment.tokenType);
    this._router.navigate(['/']);
  }

  async updateProfileImage(event: any) {
    let profile_pic = event.target.files[0];
    if (profile_pic.type.search('image') !== -1) {
      let object = await this._formData.create({ profile_pic });
      let res = await this._user.updateProfile(object);
      this._user.authUser.next(res.data);
      return;
    }
    return this._toaster.warning('Please upload valid image');
  }

  async updateProfile() {
    if (this.profile.invalid) return;
    // let object = await this._formData.create();
    let res = await this._user.updateUserDetail(this.profile.value);
    this._user.authUser.next(res.data);
  }
}
