import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadRowComponent } from './download-row.component';

describe('DownloadRowComponent', () => {
  let component: DownloadRowComponent;
  let fixture: ComponentFixture<DownloadRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DownloadRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
