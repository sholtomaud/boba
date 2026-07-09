import { BaseComponent } from '../../core/base-component.ts';
import { appStore } from '../../store/app-store.ts';
import template from './home-page.html?raw';
import style from './home-page.css?raw';

export class HomeComponent extends BaseComponent {
  static tagName = 'home-page';

  constructor() {
    super(template, style);
  }

  init() {
    this.setupEventListeners();
    this.updateCounter(appStore.getState().count);

    appStore.addEventListener('change', ((e: CustomEvent) => {
      this.updateCounter(e.detail.count);
    }) as EventListener);
  }

  setupEventListeners() {
    this.querySelector('#increment')?.addEventListener('click', () => {
      const { count } = appStore.getState();
      appStore.setState({ count: count + 1 });
    });

    this.querySelector('#decrement')?.addEventListener('click', () => {
      const { count } = appStore.getState();
      appStore.setState({ count: count - 1 });
    });
  }

  updateCounter(count: number) {
    const counterEl = this.querySelector('#home-counter');
    if (counterEl) {
      counterEl.textContent = count.toString();
    }
  }
}

if (!customElements.get(HomeComponent.tagName)) {
  customElements.define(HomeComponent.tagName, HomeComponent);
}
