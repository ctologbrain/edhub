import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { CommonService } from 'src/app/_core/services/common.service';
import { UserService } from 'src/app/_core/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  categories: any[] = [];
  search = new FormControl();
  searchData: BehaviorSubject<any> = new BehaviorSubject({
    category: [],
    data: [],
  });
  isFocused = new BehaviorSubject(false);
  serverUrl = environment.server_url;
  constructor(
    private _common: CommonService,
    public _user: UserService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.search.valueChanges
      .pipe(debounceTime(500))
      .subscribe(async (keyword) => {
        const { SubCategory, data } = await this._common.search(keyword);
        this.searchData.next({ SubCategory, data });
      });
    this._common.getCategories().then((res) => {
      this.categories = res.data;
    });
  }

  focusBlur() {
    setTimeout(() => {
      this.isFocused.next(false);
    }, 300);
  }

  logout() {
    this._user.authState.next(false);
    this._user.authUser.next({});
    localStorage.removeItem(environment.tokenType);
    this._router.navigate(['/']);
  }
}
