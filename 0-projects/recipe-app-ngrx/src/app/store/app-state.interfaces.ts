import { ShopState } from './shop/shop.interfaces';
import { AuthState } from './auth/auth.interfaces';
import { RecipeState } from './recipe/recipe.interface';

export interface AppState {
  shop: ShopState;
  auth: AuthState;
  recipe: RecipeState;
}
