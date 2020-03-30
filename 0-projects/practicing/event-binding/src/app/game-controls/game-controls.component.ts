import {
  Component,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'app-game-controls',
  templateUrl: './game-controls.component.html',
  styleUrls: ['./game-controls.component.css']
})
export class GameControlsComponent implements OnInit, OnDestroy {
  gameInterval: any;
  @Output() increment = new EventEmitter<number>();
  counter = 0;
  constructor() {}

  ngOnInit(): void {}

  startGame() {
    this.gameInterval = setInterval(() => {
      this.counter++;
      this.increment.emit(this.counter);
    }, 1000);
  }

  endGame() {
    clearInterval(this.gameInterval);
  }

  ngOnDestroy() {
    this.endGame();
  }
}
