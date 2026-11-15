import { BaseComponent } from '../../core/base-component.ts';
import template from './not-found-page.html?raw';
import style from './not-found-page.css?raw';

/** Shown by the router when no route matches (see `router.notFound`). */
export class NotFoundPageComponent extends BaseComponent {
  static tagName = 'not-found-page';

  constructor() {
    super(template, style);
  }
}

if (!customElements.get(NotFoundPageComponent.tagName)) {
  customElements.define(NotFoundPageComponent.tagName, NotFoundPageComponent);
}
