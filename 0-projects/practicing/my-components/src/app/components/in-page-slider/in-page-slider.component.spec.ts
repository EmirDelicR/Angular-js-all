import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InPageSliderComponent } from './in-page-slider.component';

describe('InPageSliderComponent', () => {
  let component: InPageSliderComponent;
  let fixture: ComponentFixture<InPageSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InPageSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InPageSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
