import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { CommonService } from 'src/app/_core/services/common.service';
import { UserService } from 'src/app/_core/services/user.service';

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
  constructor(private _common: CommonService, public _user: UserService) {}

  ngOnInit(): void {
    this.search.valueChanges
      .pipe(debounceTime(500))
      .subscribe(async (keyword) => {
        const { category, data } = await this._common.search(keyword);
        this.searchData.next({ category, data });
      });
    this._common.getCategories().then((res) => {
      this.categories = res.data;
    });
  }

  focusBlur() {
    setTimeout(() => {
      this.isFocused.next(false);
    }, 100);
  }

  logout() {
    this._user.authState.next(false);
    this._user.authUser.next({});
    localStorage.removeItem('xsrf');
  }
}
