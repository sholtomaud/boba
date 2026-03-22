const html = `
<div class="home-container">
  <h1 class="title">Boba</h1>
  <p class="message">Welcome to your new Boba app!</p>
  <div class="card">
    <p>Get started by editing <code>src/components/home-page/home-page.js</code></p>
  </div>
</div>
`;
const css = `
.home-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  text-align: center;
}

.title {
  font-size: 3rem;
  margin-bottom: 1rem;
  color: var(--primary-color, #007bff);
}

.message {
  font-size: 1.5rem;
  margin-bottom: 2rem;
}

.card {
  padding: 1.5rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
}

code {
  background-color: #eee;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
}
`;

import { BaseComponent } from '../../core/base-component.js';

export class HomeComponent extends BaseComponent {
  static tagName = 'home-page';

  constructor() {
    super(html, css);
  }

  init() {
    this.setupEventListeners();
  }

  setupEventListeners() {
    this.onclick = () => {
      const currentDateTime = new Date().toLocaleString();
      console.log('hello world ' + currentDateTime);
    };
  }
}

if (!customElements.get(HomeComponent.tagName)) {
  customElements.define(HomeComponent.tagName, HomeComponent);
}
