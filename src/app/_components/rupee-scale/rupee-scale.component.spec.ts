import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RupeeScaleComponent } from './rupee-scale.component';

describe('RupeeScaleComponent', () => {
  let component: RupeeScaleComponent;
  let fixture: ComponentFixture<RupeeScaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RupeeScaleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RupeeScaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
