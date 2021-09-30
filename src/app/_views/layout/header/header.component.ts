import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/_core/services/common.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  categories: any[] = [];
  constructor(private _common: CommonService) {}

  ngOnInit(): void {
    this._common.getCategories().then((res) => {
      this.categories = res.data;
    });
  }
}
