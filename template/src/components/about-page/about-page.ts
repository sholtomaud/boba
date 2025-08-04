// about.component.ts
import { BaseComponent } from '../../core/base-component';
import html from './about.html?raw';
import css from './about.css?raw';

export class AboutComponent extends BaseComponent {
  static readonly tagName = 'about-page';

  constructor() {
    super(html, css);
  }

  protected init(): void {
    // this.shadowRoot!.querySelector('h1')!.textContent = 'About Page';
  }
}

if (!customElements.get(AboutComponent.tagName)) {
  customElements.define(AboutComponent.tagName, AboutComponent);
}
