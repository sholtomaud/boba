import { Router, type RouteLocation } from '../../core/router/router.ts';
import { BaseComponent } from '../../core/base-component.ts';
import template from './nav-page.html?raw';
import style from './nav-page.css?raw';

export class NavComponent extends BaseComponent {
  static tagName = 'app-nav';

  constructor() {
    super(template, style);
  }

  init() {
    // Mark the link of the current page; see the aria-current rule in the CSS.
    Router.getInstance().addEventListener('navigate', (event) => {
      const { path } = (event as CustomEvent<RouteLocation>).detail;
      this.querySelectorAll('[data-nav] a').forEach((link) => {
        if (link.getAttribute('href') === path) {
          link.setAttribute('aria-current', 'page');
        } else {
          link.removeAttribute('aria-current');
        }
      });
    });
  }
}

if (!customElements.get(NavComponent.tagName)) {
  customElements.define(NavComponent.tagName, NavComponent);
}
