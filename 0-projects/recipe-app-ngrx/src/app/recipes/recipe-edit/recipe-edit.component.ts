import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app-state.interfaces';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import {
  UpdateRecipe,
  AddRecipe
} from '../../store/recipe/actions/recipe.actions';

interface FormData {
  recipeName: string;
  recipeImagePath: string;
  recipeDescription: string;
  recipeIngredients: FormArray;
}

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  id: number;
  editMode = false;
  recipeForm: FormGroup;

  private storeSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params.id;
      this.editMode = params.id !== null;
      this.initForm();
    });
  }

  onSubmit() {
    if (this.editMode) {
      this.store.dispatch(
        new UpdateRecipe({ index: this.id, newRecipe: this.recipeForm.value })
      );
    } else {
      this.store.dispatch(new AddRecipe(this.recipeForm.value));
    }

    this.onCancel();
  }

  onAddIngredient() {
    const control = new FormGroup({
      name: new FormControl(null, Validators.required),
      amount: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[1-9]+[0-9]*$/)
      ])
    });

    (this.recipeForm.get('ingredients') as FormArray).push(control);
  }

  onDeleteIngredient(index: number) {
    (this.recipeForm.get('ingredients') as FormArray).removeAt(index);
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  get controls() {
    const ctr = (this.recipeForm.get('ingredients') as FormArray).controls;
    return ctr;
  }

  private setFormData(): FormData {
    const formData: FormData = {
      recipeName: '',
      recipeImagePath: '',
      recipeDescription: '',
      recipeIngredients: new FormArray([])
    };

    if (this.editMode) {
      this.storeSubscription = this.store
        .select('recipe')
        .pipe(
          map(recipesState => {
            return recipesState.recipes.find((recipe, idx) => idx === this.id);
          })
        )
        .subscribe(recipe => {
          formData.recipeName = recipe.name;
          formData.recipeImagePath = recipe.imagePath;
          formData.recipeDescription = recipe.description;
          if (recipe.ingredients) {
            for (const ingredient of recipe.ingredients) {
              formData.recipeIngredients.push(
                new FormGroup({
                  name: new FormControl(ingredient.name, Validators.required),
                  amount: new FormControl(ingredient.amount, [
                    Validators.required,
                    Validators.pattern(/^[1-9]+[0-9]*$/)
                  ])
                })
              );
            }
          }
        });
    }

    return formData;
  }

  private initForm() {
    const data: FormData = this.setFormData();

    this.recipeForm = new FormGroup({
      name: new FormControl(data.recipeName, Validators.required),
      imagePath: new FormControl(data.recipeImagePath, Validators.required),
      description: new FormControl(data.recipeDescription, Validators.required),
      ingredients: data.recipeIngredients
    });
  }

  ngOnDestroy() {
    if (this.storeSubscription) {
      this.storeSubscription.unsubscribe();
    }
  }
}
