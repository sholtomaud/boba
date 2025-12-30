import html from './home.html?raw'; // Use ?raw instead of ?inline
import css from './home.css?raw'; // Use ?raw instead of ?inline

import { BaseComponent } from '../../core/base-component';

export class HomeComponent extends BaseComponent {
  static readonly tagName = 'home-page'; // Match the element name

  constructor() {
    super(html, css);
  }

  protected init(): void {
    this.setupEventListeners();
  }

  private setupEventListeners(): void {
    // Setup component-specific event listeners
    this.onclick = () => {
      const currentDateTime = new Date().toLocaleString();
      console.log('hello world' + currentDateTime);
      // this.shadowRoot!.querySelector('.title')!.textContent = 'W';
      // this.shadowRoot!.querySelector('.message')!.textContent = 'Welcome!' + currentDateTime;
    };
  }
}

if (!customElements.get(HomeComponent.tagName)) {
  customElements.define(HomeComponent.tagName, HomeComponent);
}
