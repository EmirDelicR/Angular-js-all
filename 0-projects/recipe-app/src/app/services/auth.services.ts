import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { SIGN_UP_URL, API_KEY, SIGN_IN_URL } from '../env/api';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

const FULL_SIGN_UP_URL = `${SIGN_UP_URL}${API_KEY}`;
const FULL_SIGN_IN_URL = `${SIGN_IN_URL}${API_KEY}`;

interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  userSubject = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) {}

  signUp(signUpData: { email: string; password: string }) {
    const data = {
      ...signUpData,
      returnSecureToken: true
    };
    return this.http.post<AuthResponseData>(FULL_SIGN_UP_URL, data).pipe(
      catchError(this.errorHandler),
      tap(resData => {
        this.authHandler(
          resData.email,
          resData.idToken,
          resData.localId,
          +resData.expiresIn
        );
      })
    );
  }

  signIn(signInData: { email: string; password: string }) {
    const data = {
      ...signInData,
      returnSecureToken: true
    };
    return this.http.post<AuthResponseData>(FULL_SIGN_IN_URL, data).pipe(
      catchError(this.errorHandler),
      tap(resData => {
        this.authHandler(
          resData.email,
          resData.idToken,
          resData.localId,
          +resData.expiresIn
        );
      })
    );
  }

  autoSignIn() {
    const data: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!data) {
      return;
    }

    const loadedUser = new User(
      data.email,
      data.id,
      data._token,
      new Date(data._tokenExpirationDate)
    );

    if (loadedUser.token) {
      this.userSubject.next(loadedUser);
      const timeLeft =
        new Date(data._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(timeLeft);
    }
  }

  logout() {
    this.userSubject.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private authHandler(
    email: string,
    token: string,
    userId: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);

    this.userSubject.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private errorHandler(errorRes: HttpErrorResponse) {
    if (!errorRes.error || !errorRes.error.error) {
      return throwError('Network Error');
    }

    return throwError(
      `${errorRes.error.error.code}: ${errorRes.error.error.message}`
    );
  }
}
