import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadInfoHeaderComponent } from './download-info-header.component';

describe('DownloadInfoHeaderComponent', () => {
  let component: DownloadInfoHeaderComponent;
  let fixture: ComponentFixture<DownloadInfoHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DownloadInfoHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadInfoHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
