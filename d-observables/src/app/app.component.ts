import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from './user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  isPressed = false;
  private pressSubscription: Subscription;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.pressSubscription = this.userService.activatedEmitter.subscribe(
      (isPress: boolean) => {
        this.isPressed = isPress;
      }
    );
  }

  ngOnDestroy() {
    this.pressSubscription.unsubscribe();
  }
}
