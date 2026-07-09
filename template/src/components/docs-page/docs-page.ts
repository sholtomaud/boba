import { BaseComponent } from '../../core/base-component.ts';
import template from './docs-page.html?raw';
import style from './docs-page.css?raw';

export class DocsPageComponent extends BaseComponent {
  static tagName = 'docs-page';
  constructor() {
    super(template, style);
  }
}

if (!customElements.get(DocsPageComponent.tagName)) {
  customElements.define(DocsPageComponent.tagName, DocsPageComponent);
}
