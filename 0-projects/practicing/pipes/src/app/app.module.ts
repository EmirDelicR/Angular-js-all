import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ReversePipe } from './shared/reverse.pipe';
import { SortPipe } from './shared/sort.pipe';

@NgModule({
  declarations: [AppComponent, ReversePipe, SortPipe],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
