import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { CommonService } from 'src/app/_core/services/common.service';
import { environment } from 'src/environments/environment';
declare let $: any;
declare let jBox: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  search = new FormControl();
  searchData: BehaviorSubject<any> = new BehaviorSubject({
    data: [],
  });
  isFocused = new BehaviorSubject(false);
  serverUrl = environment.server_url;
  constructor(private _common: CommonService) {}
  sliders: any[] = [];
  async ngOnInit() {
    let res = await this._common.getHomeSliderData();
    this.sliders = res.data;
    setTimeout(() => {
      $('.course-slider').slick({
        dots: true,
        infinite: false,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
              infinite: true,
              dots: true,
            },
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 575,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
      });
    }, 50);
    this.search.valueChanges
      .pipe(debounceTime(500))
      .subscribe(async (keyword) => {
        const { SubCategory, data } = await this._common.search(keyword);
        this.searchData.next({ SubCategory, data });
      });
  }

  ngAfterContentInit() {}

  focusBlur() {
    setTimeout(() => {
      this.isFocused.next(false);
    }, 300);
  }
}
