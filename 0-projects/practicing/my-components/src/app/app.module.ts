import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { DownloadListComponent } from './components/download/download-list/download-list.component';
import { DownloadRowComponent } from './components/download/download-row/download-row.component';
import { LanguageSwitcherComponent } from './components/language-switcher/language-switcher.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { LogoComponent } from './components/logo/logo.component';
import { CentralNavComponent } from './components/navigation/central-nav/central-nav.component';
import { DownloadInfoComponent } from './components/download/download-info/download-info.component';
import { ModalComponent } from './components/modal/modal.component';

@NgModule({
  declarations: [
    AppComponent,
    DownloadListComponent,
    DownloadRowComponent,
    LanguageSwitcherComponent,
    NavigationComponent,
    LogoComponent,
    CentralNavComponent,
    DownloadInfoComponent,
    ModalComponent,
  ],
  imports: [BrowserModule, FontAwesomeModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
