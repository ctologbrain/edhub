import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/_core/services/user.service';
import { environment } from 'src/environments/environment';
declare let $: any;
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  @Input() product: any = '';
  @Input() type = 'product';
  @Output() removeWishlist = new EventEmitter();
  @Output() removeCompare = new EventEmitter();
  @Output() addWishlist = new EventEmitter();
  @Output() addCompare = new EventEmitter();
  serverUrl = `${environment.server_url}/`;
  constructor(private _user: UserService, private _toast: ToastrService) {}

  ngOnInit(): void {}

  async addToWishlist(course_id: number) {
    if (!this._user.authState.getValue()) {
      $('.login-popup').modal('show');
      return;
    }
    this._user.wishlistCount.next(this._user.wishlistCount.getValue() + 1);
    await this._user.addToWishList(course_id);
    this.addWishlist.next(course_id);
    // }
  }

  async removeToWishlist(course_id: number) {
    this._user.wishlistCount.next(this._user.wishlistCount.getValue() - 1);
    this._user.removeToWishList(course_id);
    this.removeWishlist.next(course_id);
  }

  async removeToCompare(course_id: number) {
    await this._user.removeToCompare(course_id);
    this.removeCompare.next(course_id);
  }

  async addToCompare(course_id: number) {
    if (!this._user.authState.getValue()) {
      $('.login-popup').modal('show');
      return;
    }
    await this._user.addToCompare(course_id);
    this.addCompare.next(course_id);
    this._toast.success('added to compare.');
  }
}
