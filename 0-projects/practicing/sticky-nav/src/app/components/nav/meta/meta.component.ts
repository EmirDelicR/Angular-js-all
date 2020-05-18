import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-meta',
  templateUrl: './meta.component.html',
  styleUrls: ['./meta.component.scss'],
})
export class MetaComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  openGlobal = () => {
    const $global = document.querySelector(
      '.meta-navigation__global'
    ) as HTMLElement;
    if ($global) {
      $global.classList.toggle('meta-navigation--global-open');
    }
  };
}
