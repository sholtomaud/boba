import { Router, type RouteLocation } from '../../core/router/router.ts';
import { BaseComponent } from '../../core/base-component.ts';
import template from './nav-page.html?raw';
import style from './nav-page.css?raw';

export class NavComponent extends BaseComponent {
  static tagName = 'app-nav';

  constructor() {
    super(template, style);
  }

  // Mark the link of the current page; see the aria-current rule in the CSS.
  #onNavigate = (event: Event) => {
    const { path } = (event as CustomEvent<RouteLocation>).detail;
    this.querySelectorAll('[data-nav] a').forEach((link) => {
      if (link.getAttribute('href') === path) {
        link.setAttribute('aria-current', 'page');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  };

  // The router outlives the nav: subscribe on every connect, unsubscribe on
  // disconnect, so a removed nav leaves nothing behind.
  connected() {
    Router.getInstance().addEventListener('navigate', this.#onNavigate);
  }

  disconnectedCallback() {
    Router.getInstance().removeEventListener('navigate', this.#onNavigate);
  }
}

if (!customElements.get(NavComponent.tagName)) {
  customElements.define(NavComponent.tagName, NavComponent);
}
