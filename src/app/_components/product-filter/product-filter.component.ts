import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonService } from 'src/app/_core/services/common.service';
import { environment } from 'src/environments/environment';
declare let $: any;
@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.scss'],
})
export class ProductFilterComponent implements OnInit {
  @Input() mobile = false;
  @Output() applyFilter = new EventEmitter();
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
    this.initSlider();
  }

  async getLanguages() {
    let res = await this._common.languages();
    this.filterData.languages = res.data;
  }

  async getProviders() {
    let res = await this._common.courseProviders();
    this.filterData.providers = res.data;
  }

  initSlider() {
    const current = this;
    const slider = {
      range: true,
      min: 0,
      max: 150000,
      step: 100,
      slide: function (e: any) {
        current.minPrice = $(this).slider('values', 0);
        current.maxPrice = $(this).slider('values', 1);
      },
      create: function () {
        $(this).slider('values', 0, current.minPrice);
        $(this).slider('values', 1, current.maxPrice);
      },
      stop: function () {
        current.minPrice = $(this).slider('values', 0);
        current.maxPrice = $(this).slider('values', 1);
        current.changeFilter();
      },
    };
    $('.slider-range').slider(slider);
    $('.min-max-input').change(function (e: any) {
      var setIndex = e.currentTarget.id == 'max-price-input' ? 1 : 0;
      $('.slider-range').slider('values', setIndex, $(e.currentTarget).val());
    });
  }

  setFilter(e: any, type: string) {
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
