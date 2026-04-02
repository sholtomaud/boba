import { BaseComponent, html, css } from '../../core/base-component.ts';
import { appStore } from '../../store/app-store.ts';

const template = html`
<div class="home-container">
  <h1 class="title">Boba</h1>
  <p class="message">Welcome to your new Boba app!</p>
  <div class="card">
    <p>Global State Management:</p>
    <div class="counter-controls">
      <button id="decrement">-</button>
      <span id="home-counter">0</span>
      <button id="increment">+</button>
    </div>
    <p>Edit <code>src/components/home-page/home-page.ts</code> to get started.</p>
  </div>
</div>
`;

const style = css`
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

.counter-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin: 1rem 0;
}

button {
  padding: 0.5rem 1rem;
  font-size: 1.2rem;
  cursor: pointer;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: white;
}

button:hover {
  background: #eee;
}

#home-counter {
  font-weight: bold;
  font-size: 1.5rem;
  min-width: 2rem;
}

code {
  background-color: #eee;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
}
`;

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
    this.shadowRoot?.getElementById('increment')?.addEventListener('click', () => {
      const { count } = appStore.getState();
      appStore.setState({ count: count + 1 });
    });

    this.shadowRoot?.getElementById('decrement')?.addEventListener('click', () => {
      const { count } = appStore.getState();
      appStore.setState({ count: count - 1 });
    });
  }

  updateCounter(count: number) {
    const counterEl = this.shadowRoot?.getElementById('home-counter');
    if (counterEl) {
      counterEl.textContent = count.toString();
    }
  }
}

if (!customElements.get(HomeComponent.tagName)) {
  customElements.define(HomeComponent.tagName, HomeComponent);
}
