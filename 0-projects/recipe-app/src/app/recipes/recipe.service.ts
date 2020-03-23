import { EventEmitter, Injectable } from '@angular/core';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShopService } from '../shop/shop.service';

@Injectable()
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  constructor(private shopService: ShopService) {}

  private recipes: Recipe[] = [
    new Recipe({
      name: 'a',
      description: 'b',
      imagePath: 'c',
      ingredients: [new Ingredient('Meat', 1)]
    })
  ];

  getRecipes() {
    // return this.recipes.slice();
    return [...this.recipes];
  }

  addIngredientsToShop(ingredients: Ingredient[]) {
    this.shopService.addIngredients(ingredients);
  }
}
