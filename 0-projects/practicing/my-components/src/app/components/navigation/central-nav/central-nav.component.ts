import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-central-nav',
  templateUrl: './central-nav.component.html',
  styleUrls: ['./central-nav.component.scss'],
})
export class CentralNavComponent implements OnInit {
  navElements = ['Page_1', 'Page_2', 'Page_3', 'Page_4', 'Page_5'];
  constructor() {}

  ngOnInit(): void {}
}
