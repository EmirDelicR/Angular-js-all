import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

export class ShopService {
  ingredientChanged = new Subject<Ingredient[]>();
  private ingredients: Ingredient[] = [new Ingredient('APPELS', 10)];

  getIngredients() {
    return [...this.ingredients];
  }

  onAddIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientChanged.next([...this.ingredients]);
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingredientChanged.next([...this.ingredients]);
  }
}
