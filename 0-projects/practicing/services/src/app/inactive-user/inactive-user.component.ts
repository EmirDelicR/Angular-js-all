import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-inactive-user',
  templateUrl: './inactive-user.component.html',
  styleUrls: ['./inactive-user.component.css']
})
export class InactiveUserComponent implements OnInit {
  constructor(private usersService: UsersService) {}

  ngOnInit(): void {}

  onSetToActive(id: number) {
    this.usersService.setToActive(id);
  }

  get inactiveUsers() {
    return this.usersService.getInactiveUsers();
  }
}
