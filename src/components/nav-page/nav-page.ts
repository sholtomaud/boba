import { Router } from '../../core/router/router.ts';
import { BaseComponent } from '../../core/base-component.ts';
import template from './nav-page.html?raw';
import style from './nav-page.css?raw';

export class NavComponent extends BaseComponent {
  static tagName = 'app-nav';

  constructor() {
    super(template, style);
  }

  init() {
    this.querySelectorAll('a').forEach((link) => {
      const href = link.getAttribute('href');
      if (href && (href.startsWith('/') || href === '')) {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          Router.getInstance().navigate(href);
        });
      }
    });
  }
}

if (!customElements.get(NavComponent.tagName)) {
  customElements.define(NavComponent.tagName, NavComponent);
}
