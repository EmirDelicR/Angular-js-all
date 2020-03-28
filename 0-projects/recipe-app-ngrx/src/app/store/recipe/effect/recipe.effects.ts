import { Actions, ofType, Effect } from '@ngrx/effects';
import * as actionTypes from '../../action.types';
import {
  switchMap,
  catchError,
  map,
  tap,
  withLatestFrom
} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { SetRecipes } from '../actions/recipe.actions';
import { BASE_URL } from '../../../env/api';
import { Recipe } from 'src/app/recipes/recipe.model';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app-state.interfaces';

@Injectable()
export class RecipeEffects {
  @Effect() fetchRecipes = this.actions$.pipe(
    ofType(actionTypes.FETCH_RECIPES),
    switchMap(() => {
      return this.http.get<Recipe[]>(`${BASE_URL}recipes.json`);
    }),
    map(recipes => {
      return recipes.map(recipe => {
        return { ...recipe, ingredients: recipe.ingredients || [] };
      });
    }),
    map(recipes => {
      return new SetRecipes(recipes);
    })
  );

  @Effect({ dispatch: false })
  storeRecipes = this.actions$.pipe(
    ofType(actionTypes.STORE_RECIPES),
    withLatestFrom(this.store.select('recipe')),
    switchMap(([actionData, recipesState]) => {
      return this.http.put<Recipe[]>(
        `${BASE_URL}recipes.json`,
        recipesState.recipes
      );
    })
  );
  /** You can add $ at end to specify that this is observable */
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<AppState>
  ) {}
}
