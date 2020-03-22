import { Component, OnInit } from '@angular/core';

import { Ingredient } from '../shared/ingredient.model';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  ingredients: Ingredient[] = [new Ingredient('APPELS', 10)];

  constructor() {}

  ngOnInit(): void {}
}
