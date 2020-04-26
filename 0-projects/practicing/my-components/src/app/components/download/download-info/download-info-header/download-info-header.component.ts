import { Component, OnInit, Input } from '@angular/core';
import { DownloadData } from '../../../../interfaces/download.module';

@Component({
  selector: 'app-download-info-header',
  templateUrl: './download-info-header.component.html',
  styleUrls: ['./download-info-header.component.scss'],
})
export class DownloadInfoHeaderComponent implements OnInit {
  @Input() item: DownloadData;
  constructor() {}

  ngOnInit(): void {}
}
