const html = `<h1>About</h1><p>This is the about page.</p>`;
const css = `h1 { color: #333; }`;

import { BaseComponent } from '../../core/base-component.js';

export class AboutComponent extends BaseComponent {
  static tagName = 'about-page';

  constructor() {
    super(html, css);
  }

  init() {}
}

if (!customElements.get(AboutComponent.tagName)) {
  customElements.define(AboutComponent.tagName, AboutComponent);
}
