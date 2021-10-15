import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/_core/services/product.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  constructor(public _product: ProductService) {}

  ngOnInit(): void {}
}
