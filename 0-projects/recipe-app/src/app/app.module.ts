import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ShopComponent } from './shop/shop.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
import { ShopEditComponent } from './shop/shop-edit/shop-edit.component';
import { DropdownDirective } from './custom-directive/dropdown.directive';
import { ShopService } from './shop/shop.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ShopComponent,
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    ShopEditComponent,
    DropdownDirective
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [ShopService],
  bootstrap: [AppComponent]
})
export class AppModule {}