import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ShopRoutingModule } from './shop-routing.module';

import { ShopComponent } from './shop.component';
import { ShopEditComponent } from './shop-edit/shop-edit.component';

@NgModule({
  declarations: [ShopComponent, ShopEditComponent],
  imports: [RouterModule, CommonModule, FormsModule, ShopRoutingModule]
})
export class ShopModule {}
