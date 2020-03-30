import { Injectable } from '@angular/core';
import { CounterService } from './counter.service';

@Injectable({ providedIn: 'root' })
export class UsersService {
  active = ['testActive_1', 'testActive_2'];
  inactive = ['testInactive_1', 'testInactive_2'];

  constructor(private counterService: CounterService) {}

  setToActive(id: number) {
    this.active.push(this.inactive[id]);
    this.inactive.splice(id, 1);
    this.counterService.incActiveCounter();
  }

  setToInactive(id: number) {
    this.inactive.push(this.active[id]);
    this.active.splice(id, 1);
    this.counterService.incInactiveCounter();
  }

  getInactiveUsers() {
    return this.inactive;
  }

  getActiveUsers() {
    return this.active;
  }
}
