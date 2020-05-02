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
import { DownloadInfoHeaderComponent } from './components/download/download-info/download-info-header/download-info-header.component';
import { DownloadInfoBodyComponent } from './components/download/download-info/download-info-body/download-info-body.component';
import { DownloadInfoFooterComponent } from './components/download/download-info/download-info-footer/download-info-footer.component';
import { TruncateOverflowDirective } from './directives/truncate-overflow.directive';
import { InfoTileComponent } from './components/download/download-info/download-info-body/info-tile/info-tile.component';
import { MultiTileComponent } from './components/download/download-info/download-info-body/multi-tile/multi-tile.component';
import { ButtonComponent } from './components/button/button.component';
import { HeaderBoxComponent } from './components/header-box/header-box.component';
import { RadioButtonsComponent } from './components/radio-buttons/radio-buttons.component';
import { CheckboxesComponent } from './components/checkboxes/checkboxes.component';
import { RatingComponent } from './components/rating/rating.component';
import { CheckListComponent } from './components/check-list/check-list.component';
import { ButtonsComponent } from './components/buttons/buttons.component';

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
    DownloadInfoHeaderComponent,
    DownloadInfoBodyComponent,
    DownloadInfoFooterComponent,
    TruncateOverflowDirective,
    InfoTileComponent,
    MultiTileComponent,
    ButtonComponent,
    HeaderBoxComponent,
    RadioButtonsComponent,
    CheckboxesComponent,
    RatingComponent,
    CheckListComponent,
    ButtonsComponent,
  ],
  imports: [BrowserModule, FontAwesomeModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
