import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { RecipeService } from './recipe.service';
import { Recipe } from '../recipes/recipe.model';

const BASE_URL = '';

@Injectable({ providedIn: 'root' })
export class DataStorageServices {
  constructor(private http: HttpClient, private recipeService: RecipeService) {}

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

  //   deletePosts() {
  //     return this.http.delete(`${BASE_URL}posts.json`);
  //   }
}
