import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductService } from 'src/app/_core/services/product.service';
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
  constructor(private _user: UserService, private _product: ProductService) {}

  links = {
    internal: [],
    external: '',
  };

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

  setLinks(course: any) {
    let internal =
      (course.course_category && [
        '/',
        course.course_category.slug,
        course.course_sub_category.slug,
        'course-topic',
        course.slug,
      ]) ||
      [];
    this.links.internal = internal;
    this.links.external = course.url;
    this._product.productDetailLinks.next(this.links);
  }
}
