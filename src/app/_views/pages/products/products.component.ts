import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  constructor(private _activated: ActivatedRoute) {}

  ngOnInit(): void {
    this._activated.paramMap.subscribe((data) => {
      console.log(
        data.get('category'),
        data.get('subcategory'),
        data.get('course')
      );
    });
  }
}
