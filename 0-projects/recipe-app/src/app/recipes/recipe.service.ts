import { Injectable } from '@angular/core';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShopService } from '../shop/shop.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {
  recipeChanged = new Subject<Recipe[]>();

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

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChanged.next([...this.recipes]);
  }

  updateRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
    this.recipeChanged.next([...this.recipes]);
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipeChanged.next([...this.recipes]);
  }
}
