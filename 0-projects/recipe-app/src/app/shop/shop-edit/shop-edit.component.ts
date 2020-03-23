import { Ingredient } from '../../shared/ingredient.model';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-shop-edit',
  templateUrl: './shop-edit.component.html',
  styleUrls: ['./shop-edit.component.scss']
})
export class ShopEditComponent implements OnInit {
  @ViewChild('nameInput') nameInputRef: ElementRef;
  @ViewChild('amountInput') amountInputRef: ElementRef;

  constructor(private shopService: ShopService) {}

  ngOnInit(): void {}

  onAddItem() {
    const newIngredient = new Ingredient(
      this.nameInputRef.nativeElement.value,
      this.amountInputRef.nativeElement.value
    );

    this.shopService.onAddIngredient(newIngredient);
  }
}
