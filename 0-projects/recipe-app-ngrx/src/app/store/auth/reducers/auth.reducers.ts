import { AuthState } from '../auth.interfaces';
import { AuthActions } from '../actions/auth.actions';
import * as actionTypes from '../../action.types';

const initialState: AuthState = {
  user: null,
  errorMsg: null,
  isLoading: false
};

const authReducer = (state: AuthState = initialState, action: AuthActions) => {
  switch (action.type) {
    case actionTypes.AUTH_SUCCESS:
      return {
        ...state,
        user: action.payload,
        errorMsg: null,
        isLoading: false
      };

    case actionTypes.LOGOUT:
      return {
        ...state,
        user: null
      };

    case actionTypes.LOGIN_START:
    case actionTypes.SIGN_UP_START:
      return {
        ...state,
        errorMsg: null,
        isLoading: true
      };

    case actionTypes.AUTH_FAIL:
      return {
        ...state,
        user: null,
        errorMsg: action.payload,
        isLoading: false
      };

    case actionTypes.CLEAR_ERROR:
      return {
        ...state,
        errorMsg: null
      };
    default:
      return state;
  }
};

export { authReducer };
