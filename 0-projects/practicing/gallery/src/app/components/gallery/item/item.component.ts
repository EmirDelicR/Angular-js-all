import { Component, OnInit, Input } from '@angular/core';
import { Gallery } from '../../../interfaces/gallery.interface';
import { GalleryService } from '../../../services/gallery.services';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit {
  @Input() item: Gallery;

  constructor(private galleryService: GalleryService) {}

  ngOnInit(): void {}

  openSlider() {
    this.galleryService.setSliderData(this.item.slider);
    this.galleryService.setSliderState(true);
  }
}
