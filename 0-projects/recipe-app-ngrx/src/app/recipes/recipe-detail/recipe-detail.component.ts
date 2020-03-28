import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { AppState } from 'src/app/store/app-state.interfaces';
import { Recipe } from '../recipe.model';
import { DeleteRecipe } from '../../store/recipe/actions/recipe.actions';
import { AddIngredients } from 'src/app/store/shop/actions/shop.actions';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        map((params: Params) => +params.id),
        switchMap((id: number) => {
          this.id = id;
          return this.store.select('recipe');
        }),
        map(recipesState => {
          return recipesState.recipes.find((recipe, idx) => idx === this.id);
        })
      )
      .subscribe(recipe => {
        this.recipe = recipe;
      });
  }

  onAddToShoppingList() {
    this.store.dispatch(new AddIngredients(this.recipe.ingredients));
  }

  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  odDeleteRecipe() {
    this.store.dispatch(new DeleteRecipe(this.id));
    this.router.navigate(['/recipes']);
  }
}
