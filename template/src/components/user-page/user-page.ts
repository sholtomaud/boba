import { BaseComponent } from '../../core/base-component.ts';
import template from './user-page.html?raw';
import style from './user-page.css?raw';

export class UserPageComponent extends BaseComponent {
  static tagName = 'user-page';
  name: string = 'Guest';

  constructor() {
    super(template, style);
  }

  init() {
    this.render();
  }

  render() {
    const nameElement = this.querySelector('#user-name');
    if (nameElement) {
      nameElement.textContent = this.name;
    }
  }
}

if (!customElements.get(UserPageComponent.tagName)) {
  customElements.define(UserPageComponent.tagName, UserPageComponent);
}
