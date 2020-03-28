import { ActionReducerMap } from '@ngrx/store';
import { AppState } from './app-state.interfaces';
import { shopReducer } from './shop/reducers/shop.reducer';
import { authReducer } from './auth/reducers/auth.reducers';
import { recipeReducer } from './recipe/reducers/recipe.reducers';

export const appReducer: ActionReducerMap<AppState> = {
  shop: shopReducer,
  auth: authReducer,
  recipe: recipeReducer
};
