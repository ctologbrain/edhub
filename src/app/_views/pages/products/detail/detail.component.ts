import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/_core/services/product.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'product-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  courseDetails: any;
  serverUrl = environment.server_url;
  constructor(
    private _product: ProductService,
    private _activated: ActivatedRoute
  ) {}

  async ngOnInit() {
    this._activated.paramMap.subscribe(async (param) => {
      let pdoduct_slug = param.get('coursename');
      let res = await this._product.getCourseDetails({ pdoduct_slug });
      if (res.status == 'true') {
        this.courseDetails = res.data;
        this.courseDetails.faq = this.courseDetails.faq
          ? JSON.parse(this.courseDetails.faq)
          : [];
        this.courseDetails.prerequisites = this.courseDetails.prerequisites
          ? JSON.parse(this.courseDetails.prerequisites)
          : [];
        this.courseDetails.outcome = this.courseDetails.outcome
          ? JSON.parse(this.courseDetails.outcome)
          : [];
        // console.log(this.courseDetails);
      } else {
      }
    });
  }
}
