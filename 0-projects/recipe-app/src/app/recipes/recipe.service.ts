import { Injectable } from '@angular/core';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShopService } from '../shop/shop.service';

@Injectable()
export class RecipeService {
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

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShop(ingredients: Ingredient[]) {
    this.shopService.addIngredients(ingredients);
  }
}
