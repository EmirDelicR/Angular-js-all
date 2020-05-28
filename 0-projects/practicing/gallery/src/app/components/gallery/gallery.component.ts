import { Component, OnInit } from '@angular/core';
import { Gallery } from 'src/app/interfaces/gallery.interface';
import { GalleryService } from '../../services/gallery.services';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent implements OnInit {
  imageCollection: Gallery[] = [
    {
      title: 'Zagreb',
      img: '../../../../assets/images/1.png',
      date: '23.07.2019',
      slider: [
        '../../../../../../assets/images/1.png',
        '../../../../../../assets/images/2.png',
        '../../../../../../assets/images/3.png',
      ],
    },
    {
      title: 'Prag',
      img: '../../../../assets/images/2.png',
      date: '23.07.2019',
      slider: [
        '../../../../../../assets/images/2.png',
        '../../../../../../assets/images/1.png',
        '../../../../../../assets/images/3.png',
      ],
    },
    {
      title: 'Prag 1',
      img: '../../../../assets/images/3.png',
      date: '23.07.2019',
      slider: [
        '../../../../../../assets/images/2.png',
        '../../../../../../assets/images/1.png',
        '../../../../../../assets/images/3.png',
      ],
    },
    {
      title: 'Prag 2',
      img: '../../../../assets/images/2.png',
      date: '23.07.2019',
      slider: [
        '../../../../../../assets/images/2.png',
        '../../../../../../assets/images/1.png',
        '../../../../../../assets/images/3.png',
      ],
    },
  ];
  constructor(private galleryService: GalleryService) {}

  ngOnInit(): void {
    const $gallery = document.querySelector('.gallery') as HTMLElement;
    const $item = $gallery.querySelector('.gallery__item-wrap') as HTMLElement;
    if (this.imageCollection.length === 3) {
      $gallery.style['flex-direction'] = 'column';
    }
  }

  closeSlider() {
    this.galleryService.setSliderState(false);
  }

  get isSliderOpen() {
    return this.galleryService.sliderState;
  }

  get sliderData() {
    return this.galleryService.slider;
  }
}
