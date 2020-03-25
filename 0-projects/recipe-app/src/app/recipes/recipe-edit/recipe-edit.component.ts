import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipeService } from '../../services/recipe.service';

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
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params.id;
      this.editMode = params.id != null;
      this.initForm();
    });
  }

  onSubmit() {
    // const newRecipe = new Recipe({
    //   name: this.recipeForm.value.name,
    //   description: this.recipeForm.value.description,
    //   imagePath: this.recipeForm.value.imagePath,
    //   ingredients: this.recipeForm.value.ingredients
    // });

    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
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
      const recipe = this.recipeService.getRecipe(this.id);
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
}
