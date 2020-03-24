import { NgForm } from '@angular/forms';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';

import { Ingredient } from '../../shared/ingredient.model';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-shop-edit',
  templateUrl: './shop-edit.component.html',
  styleUrls: ['./shop-edit.component.scss']
})
export class ShopEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') ingredientForm: NgForm;
  editingSubscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private shopService: ShopService) {}

  ngOnInit(): void {
    this.editingSubscription = this.shopService.startedEditing.subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.shopService.getIngredient(index);
        this.ingredientForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        });
      }
    );
  }

  onSubmit(form: NgForm) {
    const formValue = form.value;
    const newIngredient = new Ingredient(formValue.name, formValue.amount);

    if (this.editMode) {
      this.shopService.onUpdateIngredient(this.editedItemIndex, newIngredient);
    } else {
      this.shopService.onAddIngredient(newIngredient);
    }
    this.onClearForm();
  }

  onDeleteItem() {
    this.shopService.onDeleteIngredient(this.editedItemIndex);
    this.onClearForm();
  }

  onClearForm() {
    this.ingredientForm.reset();
    this.editMode = false;
  }

  ngOnDestroy() {
    this.editingSubscription.unsubscribe();
  }
}
