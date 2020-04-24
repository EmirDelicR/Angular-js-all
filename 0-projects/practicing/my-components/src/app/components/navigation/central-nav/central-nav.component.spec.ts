import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CentralNavComponent } from './central-nav.component';

describe('CentralNavComponent', () => {
  let component: CentralNavComponent;
  let fixture: ComponentFixture<CentralNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CentralNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CentralNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
