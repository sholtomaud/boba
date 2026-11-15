import { BaseComponent } from '../../core/base-component.ts';
import template from './home-page.html?raw';
import style from './home-page.css?raw';

export class HomeComponent extends BaseComponent {
  static tagName = 'home-page';

  constructor() {
    super(template, style);
  }
}

if (!customElements.get(HomeComponent.tagName)) {
  customElements.define(HomeComponent.tagName, HomeComponent);
}
