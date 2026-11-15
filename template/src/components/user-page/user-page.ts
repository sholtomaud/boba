import { BaseComponent } from '../../core/base-component.ts';
import template from './user-page.html?raw';
import style from './user-page.css?raw';

export class UserPageComponent extends BaseComponent {
  static tagName = 'user-page';
  /** Set by the router from the `/user/:name` route parameter. */
  name = 'Guest';

  constructor() {
    super(template, style);
  }

  init() {
    this.querySelector('#user-name')!.textContent = this.name;
  }
}

if (!customElements.get(UserPageComponent.tagName)) {
  customElements.define(UserPageComponent.tagName, UserPageComponent);
}
