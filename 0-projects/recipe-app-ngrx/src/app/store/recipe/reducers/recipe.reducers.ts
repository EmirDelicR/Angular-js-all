import { RecipeState } from '../recipe.interface';
import { RecipeActions } from '../actions/recipe.actions';
import * as actionTypes from '../../action.types';

const initialState: RecipeState = {
  recipes: []
};

const recipeReducer = (
  state: RecipeState = initialState,
  action: RecipeActions
) => {
  switch (action.type) {
    case actionTypes.SET_RECIPES:
      return { ...state, recipes: [...action.payload] };

    case actionTypes.FETCH_RECIPES:
      return {
        ...state,
        recipes: [...state.recipes]
      };

    case actionTypes.ADD_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, action.payload]
      };

    case actionTypes.UPDATE_RECIPE:
      const recipe = state.recipes[action.payload.index];
      const updatedRecipe = {
        ...recipe,
        ...action.payload.newRecipe
      };

      const updatedRecipes = [...state.recipes];
      updatedRecipes[action.payload.index] = updatedRecipe;
      return {
        ...state,
        recipes: updatedRecipes
      };

    case actionTypes.DELETE_RECIPE:
      return {
        ...state,
        recipes: state.recipes.filter((rcp, idx) => idx !== action.payload)
      };
    default:
      return state;
  }
};

export { recipeReducer };
