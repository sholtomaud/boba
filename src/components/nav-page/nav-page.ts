import html from './nav.html?raw'; // Use ?raw instead of ?inline
import css from './nav.css?raw'; // Use ?raw instead of ?inline
import { Router } from '@/core/router/router';
import { BaseComponent } from '@/core/base-component';

export class NavComponent extends BaseComponent {
  static readonly tagName = 'app-nav'; // Must match HTML tag

  constructor() {
    super(html, css);
  }

  protected init(): void {
    // Add router navigation logic
    this.shadowRoot!.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        Router.getInstance().navigate(link.getAttribute('href')!);
      });
    });
  }
}

// Registration with correct tag name
if (!customElements.get(NavComponent.tagName)) {
  customElements.define(NavComponent.tagName, NavComponent);
}
