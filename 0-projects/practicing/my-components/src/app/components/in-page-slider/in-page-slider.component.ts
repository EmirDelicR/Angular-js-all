import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-in-page-slider',
  templateUrl: './in-page-slider.component.html',
  styleUrls: ['./in-page-slider.component.scss'],
})
export class InPageSliderComponent implements OnInit {
  $slide: HTMLElement;
  constructor() {}

  ngOnInit(): void {
    this.$slide = document.querySelector('.in-page-slider');
  }

  toggleClass() {
    this.$slide.classList.toggle('open');
  }
}
