import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PandaLoginComponent } from './panda-login.component';

describe('PandaLoginComponent', () => {
  let component: PandaLoginComponent;
  let fixture: ComponentFixture<PandaLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PandaLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PandaLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
