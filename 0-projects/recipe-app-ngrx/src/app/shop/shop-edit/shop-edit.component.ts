import { NgForm } from '@angular/forms';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { Ingredient } from '../../models/ingredient.model';
import { ShopState } from '../../store/shop/shop.interfaces';
import { AppState } from '../../store/app-state.interfaces';

import {
  AddIngredient,
  UpdateIngredient,
  DeleteIngredient,
  StopEdit
} from '../../store/shop/actions/shop.actions';

@Component({
  selector: 'app-shop-edit',
  templateUrl: './shop-edit.component.html',
  styleUrls: ['./shop-edit.component.scss']
})
export class ShopEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') ingredientForm: NgForm;
  editingSubscription: Subscription;
  editMode = false;
  editedItem: Ingredient;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.editingSubscription = this.store
      .select('shop')
      .subscribe((stateData: ShopState) => {
        if (stateData.editedIngredientIndex === -1) {
          this.editMode = false;
          return;
        }
        this.editMode = true;
        this.editedItem = stateData.editedIngredient;
        this.ingredientForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        });
      });
  }

  onSubmit(form: NgForm) {
    const formValue = form.value;
    const newIngredient = new Ingredient(formValue.name, formValue.amount);

    if (this.editMode) {
      this.store.dispatch(new UpdateIngredient(newIngredient));
    } else {
      this.store.dispatch(new AddIngredient(newIngredient));
    }
    this.onClearForm();
  }

  onDeleteItem() {
    this.store.dispatch(new DeleteIngredient());
    this.onClearForm();
  }

  onClearForm() {
    this.ingredientForm.reset();
    this.editMode = false;
    this.store.dispatch(new StopEdit());
  }

  ngOnDestroy() {
    this.editingSubscription.unsubscribe();
    this.store.dispatch(new StopEdit());
  }
}
