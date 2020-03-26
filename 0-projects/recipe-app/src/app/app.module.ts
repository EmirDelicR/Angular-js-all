import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { RecipeModule } from './recipes/recipes.module';
import { SharedModule } from './shared/shared.module';
import { ShopModule } from './shop/shop.module';

import { RecipeService } from './services/recipe.service';
import { ShopService } from './services/shop.service';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RecipeModule,
    ShopModule,
    SharedModule,
    AuthModule
  ],
  providers: [
    ShopService,
    RecipeService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
