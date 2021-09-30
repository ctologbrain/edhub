import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/_core/services/common.service';
declare let $: any;
declare let jBox: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private _common: CommonService) {}
  sliders: any[] = [];
  async ngOnInit() {
    let res = await this._common.getHomeSliderData();
    this.sliders = res.data;
    console.log(res.data);
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
  }

  ngAfterContentInit() {
    $('.ed-card').tooltip();
    new jBox('Tooltip', {
      attach: '.tooltip',
      trigger: 'mouseenter',
      closeOnMouseleave: true,
      content: `<div class="modal-content">
                    <div class="modal-body">
                    <h5 class="mb-3">Enable this setting?</h5>
                    <p class="mb-0">You can always change your mind in your account settings.</p>
                    </div>
                    <div class="modal-footer flex-nowrap p-0">
                        <button type="button"
                            class="btn btn-lg btn-link btn-primary-theme fs-6 text-decoration-none col-6 m-0 rounded-0 border-right"><strong>Go To Class</strong></button>
                        <button type="button" class="btn btn-lg btn-link fs-6 text-decoration-none col-6 m-0 rounded-0">View Details</button>
                    </div>
                </div>`,
      // adjustPosition: true,
      // position: {
      //     x: 'left',
      //     y: 'center'
      //   },
      outside: 'y',
      onOpen: function () {
        console.log(this.target.find('ed-card'));
        // this.source.data('clicked', (this.source.data('clicked') || 0) + 1);
      },
    });
  }
}
