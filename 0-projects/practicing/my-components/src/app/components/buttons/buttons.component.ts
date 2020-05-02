import { Component, OnInit } from '@angular/core';
import { faPlane } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss'],
})
export class ButtonsComponent implements OnInit {
  faPlane = faPlane;
  constructor() {}

  ngOnInit(): void {}
}
