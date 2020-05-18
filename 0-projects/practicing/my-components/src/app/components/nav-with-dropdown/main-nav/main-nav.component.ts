import { Component, OnInit } from '@angular/core';
import { Target } from '@angular/compiler';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss'],
})
export class MainNavComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  enter = ($event: MouseEvent) => {
    const $currentElement = $event.target as HTMLElement;
    if (!$currentElement.classList.contains('has-flyout')) {
      return;
    }

    const $flyOut = $currentElement.querySelector('.flyout');
    const $openElement = document.querySelector('.opening');

    if ($flyOut.classList.contains('opened')) {
      return;
    }

    if ($openElement) {
      $openElement.classList.remove('opened', 'opening');
      $openElement.classList.add('closed');
    } else {
      $flyOut.classList.remove('closed');
      setTimeout(() => {
        $flyOut.classList.add('opening');
      }, 10);
      return;
    }

    $flyOut.classList.remove('closed');
    $flyOut.classList.add('opening');
  };

  resetFlyOuts = ($event: MouseEvent) => {
    const $btn = $event.target as HTMLElement;
    const $parent = $btn.parentNode as HTMLElement;

    $parent.classList.remove('opening', 'opened');
    $parent.classList.add('closing');

    setTimeout(() => {
      $parent.classList.remove('closing');
      $parent.classList.remove('closed');
    }, 1000);
  };
}
