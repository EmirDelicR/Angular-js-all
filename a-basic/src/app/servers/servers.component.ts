import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  allowNewServer = false;
  serverStatus = 'Down';
  someInput = '';
  show = false;

  constructor() {
    setTimeout(() => {
      this.allowNewServer = true;
    }, 2000);
  }

  ngOnInit(): void {}

  onChangeServerStatus() {
    this.serverStatus = 'Up';
  }

  onUpdate(event: Event): void {
    const element = event.target as HTMLInputElement;
    console.log(element.value);
  }

  getColor() {
    return 'red';
  }
}
