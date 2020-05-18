import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  data = [
    {
      icon: 'A',
      text: 'Page 1',
      hasFly: true,
      flyData: 'Some content 1',
    },
    {
      icon: 'B',
      text: 'Page 2',
      hasFly: false,
      flyData: 'Some content 2',
    },
    {
      icon: 'C',
      text: 'Page 3',
      hasFly: true,
      flyData: 'Some content 3',
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
