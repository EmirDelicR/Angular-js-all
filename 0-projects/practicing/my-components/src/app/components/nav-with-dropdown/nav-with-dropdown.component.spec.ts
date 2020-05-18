import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavWithDropdownComponent } from './nav-with-dropdown.component';

describe('NavWithDropdownComponent', () => {
  let component: NavWithDropdownComponent;
  let fixture: ComponentFixture<NavWithDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavWithDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavWithDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
