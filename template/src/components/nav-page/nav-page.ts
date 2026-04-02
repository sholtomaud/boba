import { Router } from '../../core/router/router.ts';
import { BaseComponent, html, css } from '../../core/base-component.ts';
import { appStore } from '../../store/app-store.ts';

const template = html`
  <nav>
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/about">About</a></li>
      <li><a href="/todo">To-Do</a></li>
      <li><a href="/user/Boba">User</a></li>
    </ul>
    <div class="store-info">
      Counter: <span id="nav-counter">0</span>
    </div>
  </nav>
`;

const style = css`
  nav {
    background-color: #333;
    color: white;
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  ul {
    list-style-type: none;
    padding: 0;
    display: flex;
    gap: 1rem;
    margin: 0;
  }
  a {
    color: white;
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
  }
  .store-info {
    font-size: 0.9rem;
    background: #444;
    padding: 0.2rem 0.5rem;
    border-radius: 4px;
  }
`;

export class NavComponent extends BaseComponent {
  static tagName = 'app-nav';

  constructor() {
    super(template, style);
  }

  init() {
    this.shadowRoot.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const href = link.getAttribute('href');
        if (href) {
          Router.getInstance().navigate(href);
        }
      });
    });

    appStore.addEventListener('change', ((e: CustomEvent) => {
      this.updateCounter(e.detail.count);
    }) as EventListener);

    // Initial value
    this.updateCounter(appStore.getState().count);
  }

  updateCounter(count: number) {
    const counterEl = this.shadowRoot.getElementById('nav-counter');
    if (counterEl) {
      counterEl.textContent = count.toString();
    }
  }
}

if (!customElements.get(NavComponent.tagName)) {
  customElements.define(NavComponent.tagName, NavComponent);
}
