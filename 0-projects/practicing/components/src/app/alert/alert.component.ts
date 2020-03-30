import { Component, OnInit, Input } from '@angular/core';

interface Settings {
  backgroundColor: string;
  message: string;
}

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  @Input() settings: Settings;

  constructor() {}

  ngOnInit(): void {
    this.settings = {
      backgroundColor: 'none',
      message: 'Normal'
    };
  }
}
