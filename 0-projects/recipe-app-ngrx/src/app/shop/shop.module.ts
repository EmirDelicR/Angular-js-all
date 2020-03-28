import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { ShopRoutingModule } from './shop-routing.module';
import { SharedModule } from '../shared/shared.module';

import { ShopComponent } from './shop.component';
import { ShopEditComponent } from './shop-edit/shop-edit.component';

@NgModule({
  declarations: [ShopComponent, ShopEditComponent],
  imports: [RouterModule, FormsModule, ShopRoutingModule, SharedModule]
})
export class ShopModule {}
