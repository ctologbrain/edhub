import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/_core/services/product.service';

@Component({
  selector: 'app-technology',
  templateUrl: './technology.component.html',
  styleUrls: ['./technology.component.scss'],
})
export class TechnologyComponent implements OnInit {
  products = [];
  count = 0;
  constructor(
    private _activated: ActivatedRoute,
    private _product: ProductService
  ) {}

  ngOnInit(): void {
    this._activated.paramMap.subscribe(async (data) => {
      let CategoryId = data.get('technology');
      let res = await this._product.getHomePageCategoryById({ CategoryId });
      this.products = res.data;
      console.log(this.products);
      // this.count = res.data.count;
    });
  }
}
