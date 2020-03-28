import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { AppState } from '../store/app-state.interfaces';
import {
  LoginStart,
  SignUpStart,
  ClearError
} from '../store/auth/actions/auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {
  private storeSubscription: Subscription;
  isLoginMode = true;
  isLoading = false;
  errorMsg: string = null;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.storeSubscription = this.store.select('auth').subscribe(authState => {
      this.isLoading = authState.isLoading;
      this.errorMsg = authState.errorMsg;
    });
  }

  onCloseModal() {
    this.store.dispatch(new ClearError());
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    this.isLoading = true;
    if (this.isLoginMode) {
      this.store.dispatch(new LoginStart(form.value));
    } else {
      this.store.dispatch(new SignUpStart(form.value));
    }
    form.reset();
  }

  ngOnDestroy() {
    if (this.storeSubscription) {
      this.storeSubscription.unsubscribe();
    }
  }
}
