import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-active-user',
  templateUrl: './active-user.component.html',
  styleUrls: ['./active-user.component.css']
})
export class ActiveUserComponent implements OnInit {
  constructor(private usersService: UsersService) {}

  ngOnInit(): void {}

  onSetToInactive(id: number) {
    this.usersService.setToInactive(id);
  }

  get activeUsers() {
    return this.usersService.getActiveUsers();
  }
}
