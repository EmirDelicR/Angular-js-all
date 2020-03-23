import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AccountComponent } from './account/account.component';
import { NewAccountComponent } from './new-account/new-account.component';
import { AccountService } from './services/account.service';
import { LoggingService } from './services/logging.services';

@NgModule({
  declarations: [AppComponent, AccountComponent, NewAccountComponent],
  imports: [BrowserModule],
  providers: [AccountService, LoggingService],
  bootstrap: [AppComponent]
})
export class AppModule {}
