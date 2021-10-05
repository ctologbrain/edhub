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
  };
  count = 0;
  loading = new BehaviorSubject(false);
  products: any[] = [];
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
}
