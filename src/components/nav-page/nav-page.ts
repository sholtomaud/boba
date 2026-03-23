const html = `
<nav>
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/about">About</a></li>
    <li><a href="/todo">To-Do</a></li>
  </ul>
</nav>
`;
const css = `
nav {
  background-color: #333;
  color: white;
  padding: 1rem;
}
ul {
  list-style-type: none;
  padding: 0;
  display: flex;
  gap: 1rem;
}
a {
  color: white;
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}
`;

import { Router } from '../../core/router/router.ts';
import { BaseComponent } from '../../core/base-component.ts';

export class NavComponent extends BaseComponent {
  static tagName = 'app-nav';

  constructor() {
    super(html, css);
  }

  init() {
    this.shadowRoot.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        Router.getInstance().navigate(link.getAttribute('href'));
      });
    });
  }
}

if (!customElements.get(NavComponent.tagName)) {
  customElements.define(NavComponent.tagName, NavComponent);
}
