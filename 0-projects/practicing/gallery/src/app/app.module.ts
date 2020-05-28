import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { ItemComponent } from './components/gallery/item/item.component';
import { SliderComponent } from './components/gallery/slider/slider.component';

@NgModule({
  declarations: [
    AppComponent,
    GalleryComponent,
    ItemComponent,
    SliderComponent,
  ],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
