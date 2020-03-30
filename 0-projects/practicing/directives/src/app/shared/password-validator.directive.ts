import { Directive, forwardRef, Attribute } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[appPasswordValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => PasswordValidator),
      multi: true
    }
  ]
})
export class PasswordValidator implements Validator {
  constructor(
    @Attribute('appPasswordValidator') public validateEqual: string,
    @Attribute('reverse') public reverse: boolean
  ) {}

  private get isReverse() {
    if (!this.reverse) {
      return false;
    }
    return this.reverse ? true : false;
  }

  validate(confirmPasswordInput: AbstractControl): { [key: string]: any } {
    const confirmValue = confirmPasswordInput.value;

    const passwordInput = confirmPasswordInput.root.get(this.validateEqual);

    if (
      passwordInput &&
      confirmValue !== passwordInput.value &&
      !this.isReverse
    ) {
      return {
        validateEqual: false
      };
    }

    if (passwordInput && confirmValue !== passwordInput.value) {
      return {
        validateEqual: false
      };
    }

    if (
      passwordInput &&
      confirmValue === passwordInput.value &&
      this.isReverse
    ) {
      delete passwordInput.errors.appPasswordValidator;
      if (!Object.keys(passwordInput.errors).length) {
        passwordInput.setErrors(null);
      }
    }

    if (
      passwordInput &&
      confirmValue !== passwordInput.value &&
      this.isReverse
    ) {
      passwordInput.setErrors({ appPasswordValidator: false });
    }
    return null;
  }
}
