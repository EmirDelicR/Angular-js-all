import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadInfoFooterComponent } from './download-info-footer.component';

describe('DownloadInfoFooterComponent', () => {
  let component: DownloadInfoFooterComponent;
  let fixture: ComponentFixture<DownloadInfoFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DownloadInfoFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadInfoFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
