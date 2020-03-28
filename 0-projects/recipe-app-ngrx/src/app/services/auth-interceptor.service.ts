import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEventType
} from '@angular/common/http';
import { tap, take, exhaustMap, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Store } from '@ngrx/store';

import { AuthService } from './auth.services';
import { AppState } from '../store/app-state.interfaces';

@Injectable({ providedIn: 'root' })
export class AuthInterceptorService implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private store: Store<AppState>
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    /**
     * - take it going take one value and unsubscribe
     * - exhaustMap wait until first observables is done then
     *   switch to second and return that observables to replace first one
     */
    return this.store.select('auth').pipe(
      take(1),
      map(authState => {
        return authState.user;
      }),
      exhaustMap(user => {
        if (!user) {
          return next.handle(req);
        }
        const modifiedReq = req.clone({
          params: new HttpParams().set('auth', user.token)
        });
        return next.handle(modifiedReq);
      })
    );
  }
}
