import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  faDownload = faDownload;
  @Input() downloadLink: any;
  @Input() btnColor: string;
  @Input() btnClass: string;
  @Input() text: string;
  @Output() buttonClicked = new EventEmitter();
  constructor() {}

  ngOnInit(): void {
    console.log(this.downloadLink);
  }

  onButtonClick() {
    this.buttonClicked.emit();
  }
}
