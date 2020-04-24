import { Component, OnInit } from '@angular/core';

interface DownloadData {
  title: string;
  lang: string;
  description: string;
  date: string;
  type: {
    name: string;
    color: string;
  };
}

@Component({
  selector: 'app-download-row',
  templateUrl: './download-row.component.html',
  styleUrls: ['./download-row.component.scss'],
})
export class DownloadRowComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
