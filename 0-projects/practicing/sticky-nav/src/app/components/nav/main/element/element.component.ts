import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-element',
  templateUrl: './element.component.html',
  styleUrls: ['./element.component.scss'],
})
export class ElementComponent implements OnInit {
  @Input() data: {
    icon: string;
    text: string;
    hasFly: boolean;
    flyData: string;
  };
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
