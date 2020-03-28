import { Action } from '@ngrx/store';
import * as actionTypes from '../../action.types';
import { Ingredient } from '../../../models/ingredient.model';

export class AddIngredient implements Action {
  readonly type = actionTypes.ADD_INGREDIENT;

  constructor(public payload: Ingredient) {}
}

export class AddIngredients implements Action {
  readonly type = actionTypes.ADD_INGREDIENTS;

  constructor(public payload: Ingredient[]) {}
}

export class UpdateIngredient implements Action {
  readonly type = actionTypes.UPDATE_INGREDIENT;

  constructor(public payload: Ingredient) {}
}

export class DeleteIngredient implements Action {
  readonly type = actionTypes.DELETE_INGREDIENT;
}

export class StartEdit implements Action {
  readonly type = actionTypes.START_EDIT;

  constructor(public payload: number) {}
}

export class StopEdit implements Action {
  readonly type = actionTypes.STOP_EDIT;
}

export type ShopActions =
  | AddIngredient
  | AddIngredients
  | UpdateIngredient
  | DeleteIngredient
  | StartEdit
  | StopEdit;
