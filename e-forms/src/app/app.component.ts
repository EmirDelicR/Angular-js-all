import { Component, ViewChild, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {
  NgForm,
  FormGroup,
  FormControl,
  Validators,
  FormArray
} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('formRef') signUpForm: NgForm;

  displayQuestion = 'pet';
  answer = '';
  genders = ['male', 'female'];

  /** Reactive part */
  gendersR = ['male', 'female'];
  signUpFormR: FormGroup;
  forbiddenUsernames = ['Test', 'Test_1'];

  ngOnInit() {
    this.signUpFormR = new FormGroup({
      usernameR: new FormControl(null, [
        Validators.required,
        this.forbiddenNamesValidator.bind(this)
      ]),
      emailR: new FormControl(
        null,
        [Validators.required, Validators.email],
        [this.forbiddenEmailsValidator.bind(this)]
      ),
      genderR: new FormControl('male'),
      hobbies: new FormArray([])
    });
  }

  get controls() {
    const ctr = (this.signUpFormR.get('hobbies') as FormArray).controls;
    console.log('CTR: ', ctr);
    return (this.signUpFormR.get('hobbies') as FormArray).controls;
  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    (this.signUpFormR.get('hobbies') as FormArray).push(control);
  }

  forbiddenNamesValidator(control: FormControl): { [s: string]: boolean } {
    /** { [s: string]: boolean } => {'test': true} */
    if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
      return { isForbidden: true };
    }

    return null;
  }

  forbiddenEmailsValidator(
    control: FormControl
  ): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'a@a.com') {
          resolve({ forbidden: true });
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }

  onSubmitR() {
    console.log(this.signUpFormR);
  }
  /********* */
  suggestUserName() {
    const suggestedName = 'Superuser';
    this.signUpForm.form.patchValue({
      userData: {
        username: suggestedName
      }
    });
  }

  onSubmit() {
    console.log(this.signUpForm);
    this.signUpForm.reset();
  }
}
