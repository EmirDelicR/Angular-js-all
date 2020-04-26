import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DownloadData } from '../../../../interfaces/download.module';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-download-info-footer',
  templateUrl: './download-info-footer.component.html',
  styleUrls: ['./download-info-footer.component.scss'],
})
export class DownloadInfoFooterComponent implements OnInit {
  faInfo = faInfoCircle;
  @Input() data: DownloadData;
  @Input() isActive: boolean;
  @Output() setBodyLayout = new EventEmitter<boolean>();
  constructor() {}

  ngOnInit(): void {}

  toggleBodyLayout(active: boolean) {
    this.setBodyLayout.emit(active);
  }
}
