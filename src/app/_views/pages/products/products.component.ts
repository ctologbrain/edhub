import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ProductService } from 'src/app/_core/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  params: any = {
    category: null,
    subcategory: null,
    course_topic: null,
    start: 1,
    price_start: 0,
    prince_end: 150000,
    course_provider: '',
    rating: '',
    language: '',
    certification: '',
  };
  count = 0;
  loading = new BehaviorSubject(false);
  products: any = null;
  constructor(
    private _activated: ActivatedRoute,
    private _product: ProductService
  ) {}

  ngOnInit(): void {
    this._activated.paramMap.subscribe(async (data) => {
      this.params.category = data.get('category');
      this.params.subcategory = data.get('subcategory');
      this.params.course_topic = data.get('course');
      this.params.start = 1;
      let res = await this._product.getCourses(this.params);
      this.products = res.data.rows;
      this.count = res.data.count;
    });
  }

  async loadMore() {
    this.params.start = this.params.start + 1;
    this.loading.next(true);
    let res = await this._product.getCourses(this.params);
    this.products.push(...res.data.rows);
    this.loading.next(false);
  }

  async applyFilter(filter: any) {
    this.products = null;
    this.count = 0;
    this.params.price_start = filter.price_start;
    this.params.prince_end = filter.prince_end;
    this.params.course_provider = filter.course_provider;
    this.params.rating = filter.rating;
    this.params.language = filter.language;
    this.params.certification = filter.certification;
    this.params.start = 1;
    this._product.getCourses(this.params).then((res) => {
      this.products = res.data.rows;
      this.count = res.data.count;
    });
  }

  resetFilter() {
    this.params.price_start = 0;
    this.params.prince_end = 150000;
    this.params.course_provider = '';
    this.params.rating = '';
    this.params.language = '';
    this.params.certification = '';
    this.applyFilter(this.params);
  }
}
