import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() typeSelected = new EventEmitter<string>();
  constructor() {}

  ngOnInit(): void {}

  onSelect(type: string) {
    this.typeSelected.emit(type);
  }
}
