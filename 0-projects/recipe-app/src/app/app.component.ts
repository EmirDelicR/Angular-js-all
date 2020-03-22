import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  loadedType = 'recipe';

  onNavigate(type: string) {
    this.loadedType = type;
  }
}
