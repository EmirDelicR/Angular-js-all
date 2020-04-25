import { Component, OnInit, Input } from '@angular/core';
import { DownloadData } from 'src/app/interfaces/download.module';
import {
  faDownload,
  faInfoCircle,
  faStar,
  faAngleRight,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-download-row',
  templateUrl: './download-row.component.html',
  styleUrls: ['./download-row.component.scss'],
})
export class DownloadRowComponent implements OnInit {
  @Input() item: DownloadData;
  faDownload = faDownload;
  faInfo = faInfoCircle;
  faStar = faStar;
  faAngleRight = faAngleRight;

  constructor() {}

  ngOnInit(): void {}

  toggle(className: string) {
    const $elem = document.getElementsByClassName(`fa-${className}`)[0];
    $elem.parentElement.classList.toggle(className);
  }
}
