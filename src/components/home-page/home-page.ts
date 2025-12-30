import html from './home.html?raw'; // Use ?raw instead of ?inline
import css from './home.css?raw'; // Use ?raw instead of ?inline

import { BaseComponent } from '../../core/base-component';
import { counter } from '../../services/store';

export class HomeComponent extends BaseComponent {
  static readonly tagName = 'home-page'; // Match the element name

  constructor() {
    super(html, css);
  }

  protected init(): void {
    this.setupEventListeners();
    counter.subscribe(this.updateCounter.bind(this));
    this.updateCounter(counter.get());
  }

  private setupEventListeners(): void {
    // Setup component-specific event listeners
    this.shadowRoot!.querySelector('.increment')?.addEventListener(
      'click',
      this.increment.bind(this)
    );
    this.shadowRoot!.querySelector('.decrement')?.addEventListener(
      'click',
      this.decrement.bind(this)
    );
  }

  private increment(): void {
    counter.set((prev) => prev + 1);
  }

  private decrement(): void {
    counter.set((prev) => prev - 1);
  }

  private updateCounter(value: number): void {
    const counterElement = this.shadowRoot!.querySelector('.counter');
    if (counterElement) {
      counterElement.textContent = value.toString();
    }
  }
}

if (!customElements.get(HomeComponent.tagName)) {
  customElements.define(HomeComponent.tagName, HomeComponent);
}
