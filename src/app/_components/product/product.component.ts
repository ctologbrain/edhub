import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  @Input() product: any = '';
  serverUrl = `${environment.server_url}/`;
  constructor() {}

  ngOnInit(): void {}
  eror() {
    console.log('deepesh');
  }
}
