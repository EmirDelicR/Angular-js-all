import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertComponent } from './alert/alert.component';
import { LoadingComponent } from './spinners/loading.component';
import { DropdownDirective } from '../custom-directive/dropdown.directive';

@NgModule({
  declarations: [AlertComponent, LoadingComponent, DropdownDirective],
  imports: [CommonModule],
  exports: [AlertComponent, LoadingComponent, DropdownDirective, CommonModule]
})
export class SharedModule {}
