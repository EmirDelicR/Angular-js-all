import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DownloadData } from '../../../../interfaces/download.module';

@Component({
  selector: 'app-download-info-body',
  templateUrl: './download-info-body.component.html',
  styleUrls: ['./download-info-body.component.scss'],
})
export class DownloadInfoBodyComponent implements OnInit {
  @Input() item: DownloadData;
  @Input() show: boolean;
  @Output() setFile = new EventEmitter<DownloadData>();
  constructor() {}

  ngOnInit(): void {}

  setDownloadFIle(data: DownloadData) {
    this.setFile.emit(data);
  }
}
