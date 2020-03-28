import { Action } from '@ngrx/store';
import * as actionTypes from '../../action.types';
import { Recipe } from 'src/app/recipes/recipe.model';

export class SetRecipes implements Action {
  readonly type = actionTypes.SET_RECIPES;

  constructor(public payload: Recipe[]) {}
}

export class FetchRecipes implements Action {
  readonly type = actionTypes.FETCH_RECIPES;
}

export class AddRecipe implements Action {
  readonly type = actionTypes.ADD_RECIPE;

  constructor(public payload: Recipe) {}
}

export class DeleteRecipe implements Action {
  readonly type = actionTypes.DELETE_RECIPE;

  constructor(public payload: number) {}
}

export class UpdateRecipe implements Action {
  readonly type = actionTypes.UPDATE_RECIPE;

  constructor(public payload: { index: number; newRecipe: Recipe }) {}
}

export class StoreRecipes implements Action {
  readonly type = actionTypes.STORE_RECIPES;
}

export type RecipeActions =
  | SetRecipes
  | FetchRecipes
  | AddRecipe
  | DeleteRecipe
  | UpdateRecipe
  | StoreRecipes;
