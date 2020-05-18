import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-panda-login',
  templateUrl: './panda-login.component.html',
  styleUrls: ['./panda-login.component.scss'],
})
export class PandaLoginComponent implements OnInit {
  $form: HTMLFormElement;
  $eyes: HTMLCollection;
  constructor() {}

  ngOnInit(): void {
    this.$form = document.getElementsByTagName('form')[0];
    this.$eyes = document.getElementsByClassName('eye-ball');
    this.initEyeMovement();
  }

  addClassUp() {
    this.$form.classList.add('up');
  }

  removeClassUp() {
    this.$form.classList.remove('up');
  }

  initEyeMovement() {
    document.addEventListener('mousemove', (event) => {
      const dw = document.documentElement.clientWidth / 15;
      const dh = document.documentElement.clientHeight / 15;
      const x = event.pageX / dw;
      const y = event.pageY / dh;
      Array.from(this.$eyes).forEach((element: HTMLElement) => {
        element.style.width = `${x}px`;
        element.style.height = `${y}px`;
      });
    });
  }

  addInfo() {
    this.$form.classList.add('wrong-entry');
    setTimeout(() => {
      this.$form.classList.remove('wrong-entry');
    }, 3000);
  }
}
