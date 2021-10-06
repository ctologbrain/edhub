import { Component, Input, OnInit } from '@angular/core';
declare let $: any;
@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.scss'],
})
export class ProductFilterComponent implements OnInit {
  @Input() mobile = false;
  minPrice = 0;
  maxPrice = 150000;
  constructor() {}

  ngOnInit(): void {
    const current = this;
    $('.slider-range').slider({
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
    });

    $('.min-max-input').change(function (e: any) {
      var setIndex = e.currentTarget.id == 'max-price-input' ? 1 : 0;
      $('.slider-range').slider('values', setIndex, $(e.currentTarget).val());
    });
  }
}
