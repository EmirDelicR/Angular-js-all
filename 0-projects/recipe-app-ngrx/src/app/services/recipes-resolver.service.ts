import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { take, map, switchMap } from 'rxjs/operators';

import { Recipe } from '../recipes/recipe.model';
import { AppState } from '../store/app-state.interfaces';
import { FetchRecipes } from '../store/recipe/actions/recipe.actions';
import * as actionTypes from '../store/action.types';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RecipeResolverService implements Resolve<Recipe[]> {
  constructor(private store: Store<AppState>, private actions$: Actions) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    /** Not need to subscribe resolver will do that */
    return this.store.select('recipe').pipe(
      take(1),
      map(recipeState => recipeState.recipes),
      switchMap(recipes => {
        if (recipes.length === 0) {
          this.store.dispatch(new FetchRecipes());
          return this.actions$.pipe(ofType(actionTypes.SET_RECIPES), take(1));
        }
        return of(recipes);
      })
    );
  }
}
