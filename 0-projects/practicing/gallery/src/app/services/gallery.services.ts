import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class GalleryService {
  slider: string[] = [];
  sliderState = false;
  constructor() {}

  setSliderData(data: string[]) {
    this.slider = data;
  }
  setSliderState(state: boolean) {
    this.sliderState = state;
  }
}
