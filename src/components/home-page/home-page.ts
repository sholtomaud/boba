import { BaseComponent } from '../../core/base-component.ts';
import { Router } from '../../core/router/router.ts';
import template from './home-page.html?raw';
import style from './home-page.css?raw';

export class HomeComponent extends BaseComponent {
  static tagName = 'home-page';

  constructor() {
    super(template, style);
  }

  init() {
    this.querySelector('#version-tag')?.addEventListener('click', () => {
      console.log('Boba Framework v1.0.0 initialized');
    });

    this.querySelectorAll('a').forEach((link) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('/')) {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          Router.getInstance().navigate(href);
        });
      }
    });
  }
}

if (!customElements.get(HomeComponent.tagName)) {
  customElements.define(HomeComponent.tagName, HomeComponent);
}
