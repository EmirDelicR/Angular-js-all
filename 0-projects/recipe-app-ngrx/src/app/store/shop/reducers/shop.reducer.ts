import { Ingredient } from '../../../models/ingredient.model';
import * as actionTypes from '../../action.types';
import { ShopActions } from '../actions/shop.actions';
import { ShopState } from '../shop.interfaces';

const initialState: ShopState = {
  ingredients: [new Ingredient('Appels', 10)],
  editedIngredient: null,
  editedIngredientIndex: -1
};

const shopReducer = (state: ShopState = initialState, action: ShopActions) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return { ...state, ingredients: [...state.ingredients, action.payload] };

    case actionTypes.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload]
      };

    case actionTypes.UPDATE_INGREDIENT:
      const ingredient = state.ingredients[state.editedIngredientIndex];
      const updatedIngredient = {
        ...ingredient,
        ...action.payload
      };

      const updatedIngredients = [...state.ingredients];
      updatedIngredients[state.editedIngredientIndex] = updatedIngredient;

      return {
        ...state,
        ingredients: updatedIngredients,
        editedIngredient: null,
        editedIngredientIndex: -1
      };

    case actionTypes.DELETE_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients.filter(
          (ig, idx) => idx !== state.editedIngredientIndex
        ),
        editedIngredient: null,
        editedIngredientIndex: -1
      };

    case actionTypes.START_EDIT:
      return {
        ...state,
        editedIngredient: { ...state.ingredients[action.payload] },
        editedIngredientIndex: action.payload
      };

    case actionTypes.STOP_EDIT:
      return {
        ...state,
        editedIngredient: null,
        editedIngredientIndex: -1
      };

    default:
      return state;
  }
};

export { shopReducer };
