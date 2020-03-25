import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Recipe } from '../recipes/recipe.model';
import { DataStorageServices } from './data-storage.service';
import { RecipeService } from './recipe.service';

@Injectable({ providedIn: 'root' })
export class RecipeResolverService implements Resolve<Recipe[]> {
  constructor(
    private dataStorageService: DataStorageServices,
    private recipeService: RecipeService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    /** Not need to subscribe resolver will do that */
    const recipes = this.recipeService.getRecipes();

    if (recipes.length > 0) {
      return recipes;
    }

    return this.dataStorageService.fetchRecipes();
  }
}
