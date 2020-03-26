import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';

import { AuthComponent } from './auth.component';

@NgModule({
  declarations: [AuthComponent],
  imports: [RouterModule, FormsModule, AuthRoutingModule, SharedModule]
})
export class AuthModule {}
