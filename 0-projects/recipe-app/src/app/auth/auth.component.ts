import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  errorMsg: string = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    this.isLoading = true;
    if (this.isLoginMode) {
      this.signIn(form.value);
    } else {
      this.signUp(form.value);
    }
    form.reset();
  }

  private signUp(dataToSend: { email: string; password: string }) {
    this.authService.signUp(dataToSend).subscribe(data => {
      console.log('Data: ', data);
      this.isLoading = false;
      this.router.navigate(['/recipes']);
    }, this.errorHandler.bind(this));
  }

  private signIn(dataToSend: { email: string; password: string }) {
    this.authService.signIn(dataToSend).subscribe(data => {
      console.log('Data: ', data);
      this.isLoading = false;
      this.router.navigate(['/recipes']);
    }, this.errorHandler.bind(this));
  }

  private errorHandler(errorMsg: string) {
    console.log('Error: ', errorMsg);
    this.isLoading = false;
    this.errorMsg = errorMsg;
  }
}
