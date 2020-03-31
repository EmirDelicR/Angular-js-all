import { Directive, Attribute } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[appPasswordValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: PasswordValidator,
      multi: true
    }
  ]
})
export class PasswordValidator implements Validator {
  constructor(
    @Attribute('appPasswordValidator') public validateEqual: string
  ) {}

  validate(control: AbstractControl): { [key: string]: boolean } | null {
    const compareTo = control.parent.get(this.validateEqual);

    if (compareTo && compareTo.value !== control.value) {
      return { notEqual: true };
    }

    return null;
  }
}
