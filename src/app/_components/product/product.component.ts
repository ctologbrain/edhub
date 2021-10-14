import { Component, Input, OnInit } from '@angular/core';
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
  serverUrl = `${environment.server_url}/`;
  constructor(private _user: UserService) {}

  ngOnInit(): void {}

  async addToWishlist(course_id: number) {
    if (!this._user.authState.getValue()) {
      $('.login-popup').modal('show');
      return;
    }
    if (confirm('Add this item to wishlist ?')) {
      await this._user.addToWishList(course_id);
    }
  }

  async removeToWishlist(course_id: number) {
    await this._user.removeToWishList(course_id);
  }
}
