import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  $metaNav: HTMLElement;
  $mainNav: HTMLElement;
  $pageNav: HTMLElement;
  $mainLogo: HTMLElement | null;
  $metaLogo: HTMLElement | null;
  $global: HTMLElement | null;
  $body: HTMLElement;

  lastScroll = 0;
  showBreakPoint = 245;
  pageNavOffset = 365;

  constructor() {}

  ngOnInit(): void {
    window.onscroll = this.scrollEffect;
    this.initDoom();
  }

  initDoom = () => {
    this.$body = document.querySelector('body');
    this.$metaNav = document.querySelector('.meta-navigation');
    this.$mainNav = document.querySelector('.main-navigation');
    this.$pageNav = document.querySelector('.page-navigation');
    this.$mainLogo = this.$mainNav
      ? this.$mainNav.querySelector('.main-navigation__logo')
      : null;
    this.$metaLogo = this.$metaNav
      ? this.$metaNav.querySelector('.meta-navigation__logo')
      : null;
    this.$global = document.querySelector('.meta-navigation__global') || null;
  };

  animatePageNavigation = () => {
    if (this.$pageNav.classList.contains('is-animated')) {
      this.$pageNav.classList.add('page-navigation--animate');
      this.$pageNav.classList.remove('is-animated');
      setTimeout(() => {
        this.$pageNav.classList.remove(
          'page-navigation--animate',
          'page-navigation--top'
        );
      }, 300);
    }
  };

  scrollDown = (scrollState: number) => {
    if (
      this.$global &&
      this.$global.classList.contains('meta-navigation--global-open')
    ) {
      this.$global.classList.remove('meta-navigation--global-open');
    }

    if (this.$mainNav && scrollState > 65) {
      this.$mainNav.classList.add('main-navigation--sticky');
      this.$mainLogo.classList.add('main-navigation__logo--show');
      this.$mainNav.classList.remove('main-navigation--top');
      this.$body.style['margin-top'] = '65px';
    }

    if (this.$pageNav && scrollState > this.pageNavOffset + 65) {
      if (this.$pageNav.classList.contains('is-animated')) {
        this.$pageNav.classList.add(
          'page-navigation--sticky',
          'page-navigation--top'
        );
      }

      if (scrollState > this.pageNavOffset + 165) {
        this.$mainNav.classList.add('main-navigation--animate');
        this.animatePageNavigation();
      }
    }
  };

  scrollUp = (scrollState: number) => {
    if (scrollState === 0) {
      this.$metaNav.classList.remove('meta-navigation--sticky');
      this.$body.style['margin-top'] = '0';
    }

    if (this.$mainNav && scrollState < 65) {
      this.$body.style['margin-top'] = '0';
    }

    if (this.$mainNav && scrollState < 65) {
      this.$mainNav.classList.remove(
        'main-navigation--sticky',
        'main-navigation--top'
      );
      this.$mainLogo.classList.remove('main-navigation__logo--show');
    }

    if (!this.$pageNav && this.$mainNav && scrollState > 65) {
      this.$mainNav.classList.add(
        'main-navigation--sticky',
        'main-navigation--top'
      );
      this.$mainLogo.classList.remove('main-navigation__logo--show');
      this.$metaNav.classList.add('meta-navigation--sticky');
    }

    if (this.$pageNav && scrollState <= this.pageNavOffset) {
      this.$pageNav.classList.add('is-animated');
      this.$pageNav.classList.remove('page-navigation--sticky');
    }

    if (this.$pageNav && scrollState <= this.pageNavOffset - 20) {
      this.$mainNav.classList.remove('main-navigation--animate');
    }
  };

  scrollEffect = () => {
    const currentScrollState = document.documentElement.scrollTop;

    if (!this.$mainNav && currentScrollState > 0) {
      this.$metaNav.classList.add('meta-navigation--sticky');
    }

    if (this.$mainNav && currentScrollState > this.lastScroll) {
      this.scrollDown(currentScrollState);
    } else {
      this.scrollUp(currentScrollState);
    }

    this.lastScroll = currentScrollState <= 0 ? 0 : currentScrollState;
  };
}
