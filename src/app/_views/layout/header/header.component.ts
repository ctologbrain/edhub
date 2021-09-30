import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { CommonService } from 'src/app/_core/services/common.service';

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
  constructor(private _common: CommonService) {}

  ngOnInit(): void {
    this.search.valueChanges
      .pipe(debounceTime(500))
      .subscribe(async (keyword) => {
        const { category, data } = await this._common.search(keyword);
        console.log(category, data);
        this.searchData.next({ category, data });
        console.log(this.searchData.getValue());
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
}
