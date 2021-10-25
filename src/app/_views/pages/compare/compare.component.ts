import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_core/services/user.service';
import { environment } from 'src/environments/environment';
declare let $: any;
@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.scss'],
})
export class CompareComponent implements OnInit {
  items = [];
  serverUrl = environment.server_url;
  constructor(private _user: UserService) {}

  async ngOnInit() {
    let res = await this._user.getCompare();
    this.items = res.data;
    console.log(this.items);
    setTimeout(() => {
      let cpRowOneAllHeights: any = [];
      var rowIndex = $('.compare-part').length;
      var maxHeight = 0;
      var compareColumnWidth = 0;
      var compareParentContainerWidth = $('.compare-product-panel')
        .parent('.col-9')
        .outerWidth();

      if (compareParentContainerWidth == 720) {
        compareColumnWidth = compareParentContainerWidth / 2.25;
      } else if (compareParentContainerWidth == 540) {
        compareColumnWidth = compareParentContainerWidth / 1.8;
      } else if (compareParentContainerWidth == 405) {
        compareColumnWidth = compareParentContainerWidth / 1.65;
      } else if (compareParentContainerWidth < 405) {
        compareColumnWidth = compareParentContainerWidth / 1.65;
      } else {
        compareColumnWidth = compareParentContainerWidth / 3.25;
      }

      for (var i = 1; i <= rowIndex; i++) {
        $('.cp-row-' + i).each((index: number, element: any) => {
          $('.comp-pro-item').css('width', compareColumnWidth);
          cpRowOneAllHeights.push($(element).outerHeight());
        });
        maxHeight = Math.max.apply(Math, cpRowOneAllHeights);
        $('.cp-row-' + i).css('height', maxHeight);
        // console.log(compareParentContainerWidth)
        cpRowOneAllHeights = [];
      }
    }, 50);
  }

  async removeCompare(index: number, course_id: number) {
    await this._user.removeToCompare(course_id);
    this.items.splice(index, 1);
  }
}
