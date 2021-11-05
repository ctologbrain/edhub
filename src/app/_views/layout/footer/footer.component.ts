import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CustomValidators } from 'src/app/_core/helpers/custom-validators';
import { CommonService } from 'src/app/_core/services/common.service';
declare let $: any;

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  callback: FormGroup;
  constructor(
    private _builder: FormBuilder,
    private _common: CommonService,
    private _toast: ToastrService
  ) {
    this.callback = this._builder.group({
      name: ['Test', Validators.required],
      mobile_no: [
        '1234567890',
        [Validators.required, CustomValidators.isMobile()],
      ],
    });
  }

  ngOnInit(): void {}

  async requestCall() {
    this.callback.markAllAsTouched();
    if (this.callback.invalid) return;
    this.callback.disable();
    await this._common.requestCall(this.callback.value);
    this.callback.reset();
    this.callback.enable();
    $('.modal').modal('hide');
    this._toast.success('Thanks for request, We will contact you soon.');
  }
}
