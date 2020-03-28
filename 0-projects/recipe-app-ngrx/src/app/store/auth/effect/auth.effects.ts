import { Actions, ofType, Effect } from '@ngrx/effects';
import * as actionTypes from '../../action.types';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import {
  LoginStart,
  AuthSuccess,
  AuthFail,
  SignUpStart
} from '../actions/auth.actions';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { SIGN_UP_URL, API_KEY, SIGN_IN_URL } from '../../../env/api';
import { AuthResponseData } from '../auth.interfaces';
import { of } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.services';

const FULL_SIGN_IN_URL = `${SIGN_IN_URL}${API_KEY}`;
const FULL_SIGN_UP_URL = `${SIGN_UP_URL}${API_KEY}`;

@Injectable()
export class AuthEffects {
  @Effect() authSignUp = this.actions$.pipe(
    ofType(actionTypes.SIGN_UP_START),
    switchMap((authData: SignUpStart) => {
      const data = {
        ...authData.payload,
        returnSecureToken: true
      };
      return this.http.post<AuthResponseData>(FULL_SIGN_UP_URL, data).pipe(
        tap(resData => {
          this.authService.setLogoutTimer(+resData.expiresIn * 1000);
        }),
        map(resData => {
          return this.authHandler(resData);
        }),
        catchError(error => {
          /** NOTE must return non error observable do it with of() */
          const message = this.errorHandler(error);
          return of(new AuthFail(message));
        })
      );
    })
  );

  @Effect()
  authLogin = this.actions$.pipe(
    /** It will run only this action add multiple actions by adding ,  */
    ofType(actionTypes.LOGIN_START),
    switchMap((authData: LoginStart) => {
      const data = {
        ...authData.payload,
        returnSecureToken: true
      };
      return this.http.post<AuthResponseData>(FULL_SIGN_IN_URL, data).pipe(
        tap(resData => {
          this.authService.setLogoutTimer(+resData.expiresIn * 1000);
        }),
        map(resData => {
          return this.authHandler(resData);
        }),
        catchError(error => {
          /** NOTE must return non error observable do it with of() */
          const message = this.errorHandler(error);
          return of(new AuthFail(message));
        })
      );
    })
  );

  @Effect({ dispatch: false })
  authRedirect = this.actions$.pipe(
    ofType(actionTypes.AUTH_SUCCESS),
    tap(() => {
      this.router.navigate(['/']);
    })
  );

  @Effect()
  autoLogin = this.actions$.pipe(
    ofType(actionTypes.AUTO_LOGIN),
    map(() => {
      const data: {
        email: string;
        id: string;
        _token: string;
        _tokenExpirationDate: string;
      } = JSON.parse(localStorage.getItem('userData'));
      if (!data) {
        return { type: 'DUMMY' };
      }

      const loadedUser = new User(
        data.email,
        data.id,
        data._token,
        new Date(data._tokenExpirationDate)
      );

      if (loadedUser.token) {
        const timeLeft =
          new Date(data._tokenExpirationDate).getTime() - new Date().getTime();
        this.authService.setLogoutTimer(timeLeft);
        return new AuthSuccess(loadedUser);
      }
      return { type: 'DUMMY' };
    })
  );

  @Effect({ dispatch: false })
  authLogout = this.actions$.pipe(
    ofType(actionTypes.LOGOUT),
    tap(() => {
      this.authService.clearLogoutTimer();
      localStorage.removeItem('userData');
      this.router.navigate(['/auth']);
    })
  );
  /** You can add $ at end to specify that this is observable */
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  private errorHandler(errorRes: HttpErrorResponse) {
    if (!errorRes.error || !errorRes.error.error) {
      return 'Network Error';
    }

    return `${errorRes.error.error.code}: ${errorRes.error.error.message}`;
  }

  private authHandler(resData) {
    const expirationDate = new Date(
      new Date().getTime() + +resData.expiresIn * 1000
    );
    const user = new User(
      resData.email,
      resData.localId,
      resData.idToken,
      expirationDate
    );
    localStorage.setItem('userData', JSON.stringify(user));
    return new AuthSuccess(user);
  }
}
