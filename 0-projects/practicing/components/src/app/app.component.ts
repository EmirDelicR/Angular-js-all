import { Component } from '@angular/core';

interface Settings {
  backgroundColor: string;
  message: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isSuccess = false;
  isWarning = false;
  alertSettings: Settings = null;

  toggleSuccess() {
    this.isSuccess = !this.isSuccess;
  }

  toggleWarning() {
    this.isWarning = !this.isWarning;
  }

  toggleAlert(type: string) {
    switch (type) {
      case 'error':
        this.alertSettings = {
          backgroundColor: 'red',
          message: 'Error'
        };
        break;
      case 'warning':
        this.alertSettings = {
          backgroundColor: 'yellow',
          message: 'Warning'
        };
        break;

      case 'success':
        this.alertSettings = {
          backgroundColor: 'green',
          message: 'Success'
        };
        break;
      default:
        this.alertSettings = {
          backgroundColor: 'white',
          message: 'Normal'
        };
        break;
    }
  }
}
