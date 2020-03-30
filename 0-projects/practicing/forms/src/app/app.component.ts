import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

interface Data {
  email: string;
  subscription: string;
  password: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'forms';
  selectedItem = 'Advance';
  list = ['Basic', 'Advance', 'Pro'];
  data = null;

  onSubmit(form: NgForm) {
    this.data = form.value;
  }

  clearForm(form: NgForm) {
    this.data = null;
    form.reset();
  }
}
