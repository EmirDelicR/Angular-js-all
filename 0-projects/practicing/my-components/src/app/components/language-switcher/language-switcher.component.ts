import { Component, OnInit } from '@angular/core';
import { faGlobe, faAngleDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-language-switcher',
  templateUrl: './language-switcher.component.html',
  styleUrls: ['./language-switcher.component.scss'],
})
export class LanguageSwitcherComponent implements OnInit {
  faGlobe = faGlobe;
  faArrow = faAngleDown;

  constructor() {}

  ngOnInit(): void {}

  toggle() {
    const $btn = document.getElementsByClassName('lang-switch__btn')[0];
    $btn.classList.toggle('open');
  }
}
