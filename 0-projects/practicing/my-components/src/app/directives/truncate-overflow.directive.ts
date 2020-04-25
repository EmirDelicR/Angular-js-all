import { AfterViewInit, Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appTruncateOverflow]',
})
export class TruncateOverflowDirective implements AfterViewInit {
  constructor(private elemRef: ElementRef) {}

  ngAfterViewInit(): void {
    const $el = this.elemRef.nativeElement as HTMLElement;
    let targetElement = $el.querySelector('[appTruncateTarget]') as HTMLElement;

    if (!targetElement) {
      targetElement = $el;
    }

    const words = targetElement.innerHTML.split(' ');
    while ($el.scrollHeight - 1 > $el.offsetHeight) {
      if (words.length < 2) {
        break;
      }
      words.pop();
      targetElement.innerHTML = words.join(' ') + '...';
    }
  }
}
