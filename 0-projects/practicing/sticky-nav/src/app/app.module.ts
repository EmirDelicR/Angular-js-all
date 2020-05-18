import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { MainComponent } from './components/nav/main/main.component';
import { MetaComponent } from './components/nav/meta/meta.component';
import { PageComponent } from './components/nav/page/page.component';
import { SearchComponent } from './components/nav/search/search.component';
import { GlobalComponent } from './components/nav/global/global.component';
import { HeroComponent } from './components/nav/hero/hero.component';
import { ElementComponent } from './components/nav/main/element/element.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    MainComponent,
    MetaComponent,
    PageComponent,
    SearchComponent,
    GlobalComponent,
    HeroComponent,
    ElementComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
