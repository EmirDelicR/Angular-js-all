import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  oddNumbers = [];
  evenNumbers = [];

  sortNumbers(counter: number) {
    if (counter % 2 === 0) {
      this.evenNumbers.push(counter);
    } else {
      this.oddNumbers.push(counter);
    }
  }
}
