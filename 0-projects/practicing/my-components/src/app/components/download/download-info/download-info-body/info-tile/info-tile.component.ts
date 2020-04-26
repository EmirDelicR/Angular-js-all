import { Component, OnInit } from '@angular/core';
import { faStar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-info-tile',
  templateUrl: './info-tile.component.html',
  styleUrls: ['./info-tile.component.scss'],
})
export class InfoTileComponent implements OnInit {
  faInfo = faStar;
  constructor() {}

  ngOnInit(): void {}
}
