import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadInfoBodyComponent } from './download-info-body.component';

describe('DownloadInfoBodyComponent', () => {
  let component: DownloadInfoBodyComponent;
  let fixture: ComponentFixture<DownloadInfoBodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DownloadInfoBodyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadInfoBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
