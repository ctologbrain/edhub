import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_core/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.scss'],
})
export class WishListComponent implements OnInit {
  wishlistData: any;
  serverUrl = environment.server_url;
  constructor(private _user: UserService) {}

  ngOnInit(): void {
    this.getWishList();
  }

  async getWishList() {
    let res = await this._user.getWishList();
    this.wishlistData = res.data;
  }

  async removeToWishlist(index: number) {
    this.wishlistData.splice(index, 1);
  }
}
