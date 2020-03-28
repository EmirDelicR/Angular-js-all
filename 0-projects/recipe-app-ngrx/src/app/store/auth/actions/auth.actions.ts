import { Action } from '@ngrx/store';
import * as actionTypes from '../../action.types';
import { User } from 'src/app/models/user.model';

export class AuthSuccess implements Action {
  readonly type = actionTypes.AUTH_SUCCESS;

  constructor(public payload: User) {}
}

export class Logout implements Action {
  readonly type = actionTypes.LOGOUT;
}

export class LoginStart implements Action {
  readonly type = actionTypes.LOGIN_START;

  constructor(public payload: { email: string; password: string }) {}
}

export class AuthFail implements Action {
  readonly type = actionTypes.AUTH_FAIL;

  constructor(public payload: string) {}
}

export class SignUpStart implements Action {
  readonly type = actionTypes.SIGN_UP_START;

  constructor(public payload: { email: string; password: string }) {}
}

export class ClearError implements Action {
  readonly type = actionTypes.CLEAR_ERROR;
}

export class AutoLogin implements Action {
  readonly type = actionTypes.AUTO_LOGIN;
}

export type AuthActions =
  | AuthSuccess
  | Logout
  | LoginStart
  | AuthFail
  | SignUpStart
  | ClearError
  | AutoLogin;
