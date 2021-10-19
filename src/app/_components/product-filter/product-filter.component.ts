import { Options } from '@angular-slider/ngx-slider/options';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonService } from 'src/app/_core/services/common.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.scss'],
})
export class ProductFilterComponent implements OnInit {
  @Input() mobile = false;
  @Output() applyFilter = new EventEmitter();
  options: Options = {
    floor: 0,
    ceil: 5,
    step: 0.5,
  };
  minPrice = 0;
  maxPrice = 150000;
  serverurl = environment.server_url;
  filterData: { languages: any; providers: any } = {
    languages: null,
    providers: null,
  };

  filters: any = {
    price_start: this.minPrice,
    prince_end: this.maxPrice,
    course_provider: [],
    rating: [],
    language: [],
    certification: [],
  };
  constructor(private _common: CommonService) {}

  ngOnInit() {
    this.getLanguages();
    this.getProviders();
  }

  async getLanguages() {
    let res = await this._common.languages();
    this.filterData.languages = res.data;
  }

  async getProviders() {
    let res = await this._common.courseProviders();
    this.filterData.providers = res.data;
  }

  setFilter(e: any, type: string) {
    console.log(e, type);
    let index = this.filters[type].indexOf(e.target.value.trim());
    if (index == -1) {
      this.filters[type].push(e.target.value.trim());
    } else {
      this.filters[type].splice(index, 1);
    }
    this.changeFilter();
  }

  changeFilter() {
    let filter: any = {};
    this.filters.price_start = this.minPrice;
    this.filters.prince_end = this.maxPrice;
    for (const key in this.filters) {
      if (Object.prototype.hasOwnProperty.call(this.filters, key)) {
        const element = this.filters[key];
        filter[key] = element.toString();
      }
    }
    this.applyFilter.next(filter);
  }
}
