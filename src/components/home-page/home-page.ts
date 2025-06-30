import html from './home.html?raw';
import css from './home.css?raw'; // Keep this import even if home.css is minimal

import { BaseComponent } from '../../core/base-component';

export class HomeComponent extends BaseComponent {
  static readonly tagName = 'home-page';

  constructor() {
    // Pass HTML content and CSS (which might be minimal or empty if all styles are via Tailwind in HTML)
    super(html, css);
  }

  // No specific init logic needed for this version of the homepage
  // protected init(): void {
  //   console.log('Home component initialized');
  // }
}

if (!customElements.get(HomeComponent.tagName)) {
  customElements.define(HomeComponent.tagName, HomeComponent);
}
