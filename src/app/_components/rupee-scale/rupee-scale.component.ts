import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'rupee-scale',
  templateUrl: './rupee-scale.component.html',
  styleUrls: ['./rupee-scale.component.scss'],
})
export class RupeeScaleComponent implements OnInit {
  @Input() scale = 0;
  constructor() {}

  ngOnInit(): void {}
}
