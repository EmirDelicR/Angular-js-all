import { Component, OnInit } from '@angular/core';
import { DownloadData } from 'src/app/interfaces/download.module';
import { data } from './data.js';

@Component({
  selector: 'app-download-list',
  templateUrl: './download-list.component.html',
  styleUrls: ['./download-list.component.scss'],
})
export class DownloadListComponent implements OnInit {
  myData: DownloadData[] = data;
  constructor() {}

  ngOnInit(): void {}
}
