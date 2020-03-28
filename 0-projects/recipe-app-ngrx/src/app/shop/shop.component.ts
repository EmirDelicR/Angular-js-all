import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { StartEdit } from '../store/shop/actions/shop.actions';
import { AppState } from '../store/app-state.interfaces';
import { ShopState } from '../store/shop/shop.interfaces';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  ingredients: Observable<ShopState>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.ingredients = this.store.select('shop');
  }

  onEditItem(index: number) {
    this.store.dispatch(new StartEdit(index));
  }
}
