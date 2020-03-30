import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CounterService {
  activeCounter = 0;
  inactiveCounter = 0;

  incActiveCounter() {
    this.activeCounter++;
    console.log('AC: ', this.activeCounter);
  }

  incInactiveCounter() {
    this.inactiveCounter++;
    console.log('IC: ', this.inactiveCounter);
  }
}
