import { Component, OnInit, OnDestroy } from '@angular/core';

import { Ingredient } from '../shared/ingredient.model';
import { ShopService } from './shop.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private ingredientsChangeSubscription: Subscription;

  constructor(private shopService: ShopService) {}

  ngOnInit(): void {
    this.ingredients = this.shopService.getIngredients();
    this.ingredientsChangeSubscription = this.shopService.ingredientChanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    );
  }

  onEditItem(index: number) {
    this.shopService.startedEditing.next(index);
  }

  ngOnDestroy() {
    this.ingredientsChangeSubscription.unsubscribe();
  }
}
