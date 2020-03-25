import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, tap, take, exhaustMap } from 'rxjs/operators';
import { RecipeService } from './recipe.service';
import { Recipe } from '../recipes/recipe.model';

import { BASE_URL } from '../env/api';
import { AuthService } from './auth.services';

@Injectable({ providedIn: 'root' })
export class DataStorageServices {
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http
      .put<Recipe[]>(`${BASE_URL}recipes.json`, recipes)
      .subscribe(response => {
        console.log('PUT<storeRecipes> response: ', response);
      });
  }

  fetchRecipes() {
    return this.http.get<Recipe[]>(`${BASE_URL}recipes.json`).pipe(
      map(recipes => {
        return recipes.map(recipe => {
          return { ...recipe, ingredients: recipe.ingredients || [] };
        });
      }),
      tap(recipes => {
        this.recipeService.setRecipes(recipes);
      })
    );
  }
}
