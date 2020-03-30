import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  username = '';
  _isHidden = false;
  logs: string[] = [];

  clearUsername() {
    this.username = '';
  }

  get isEmpty() {
    return this.username.trim() === '' ? true : false;
  }

  get isHidden() {
    return this._isHidden;
  }

  toggleParagraph() {
    this.setLogs();
    this._isHidden = !this._isHidden;
  }

  private setLogs() {
    const log = `${this.logs.length + 1} - ${new Date()}`;
    this.logs.push(log);
  }
}
