import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  AfterViewInit,
} from '@angular/core';
import Swiper from 'swiper';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent implements AfterViewInit, OnDestroy {
  @Input() data: string[];
  swiper: any;
  constructor() {}

  ngAfterViewInit(): void {
    this.swiper = new Swiper('.swiper-container', {
      effect: 'coverflow',
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: 'auto',
      speed: 3000,
      loop: true,
      autoplay: {
        delay: 1000,
      },
      coverflowEffect: {
        rotate: 5,
        stretch: 0,
        depth: 400,
        modifier: 1,
        slideShadows: true,
      },
    });
    console.log(this.swiper);
  }

  ngOnDestroy(): void {
    this.swiper = null;
  }
}
