import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  DownloadData,
  DownloadDocument,
} from '../../../interfaces/download.module';

@Component({
  selector: 'app-download-info',
  templateUrl: './download-info.component.html',
  styleUrls: ['./download-info.component.scss'],
})
export class DownloadInfoComponent implements OnInit {
  @Input() item: DownloadData;
  @Output() closeModal = new EventEmitter();
  downloadDocument: DownloadDocument;
  showInfo = true;

  constructor() {}

  ngOnInit(): void {
    this.downloadDocument = this.item;
  }

  onChangeBodyLayout(show: boolean) {
    this.showInfo = show;
  }

  onDownloadFileChange(item: DownloadDocument) {
    this.downloadDocument = this.item;

    if (item) {
      this.downloadDocument = {
        favorite: this.item.favorite,
        ...item,
        lang: this.item.lang,
      };
    }
  }
}
