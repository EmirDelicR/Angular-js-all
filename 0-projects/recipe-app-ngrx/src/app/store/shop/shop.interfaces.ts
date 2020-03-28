import { Ingredient } from '../../models/ingredient.model';

export interface ShopState {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}
