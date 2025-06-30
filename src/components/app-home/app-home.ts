import { BaseComponent, html } from '@/core/base-component';
import { property } from 'lit/decorators.js';

// Import styles if you have a separate CSS file for this component
// import './app-home.css';

class AppHome extends BaseComponent {
  @property({ type: String }) greeting = 'Welcome to the New Homepage!';

  render() {
    return html`
      <section class="hero-section py-20 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-center">
        <div class="container mx-auto px-6">
          <h1 class="text-5xl font-bold mb-4">${this.greeting}</h1>
          <p class="text-xl mb-8">
            This is a modern web component template built with TypeScript, Vite, and Lit, now featuring Tailwind CSS!
          </p>
          <a href="https://github.com/thepassle/ts-wc-template" target="_blank" rel="noopener noreferrer" class="bg-white text-indigo-600 font-bold py-3 px-6 rounded-full hover:bg-gray-100 transition duration-300 transform hover:scale-105 text-lg">
            Get Started
          </a>
        </div>
      </section>

      <section class="features-section py-16 bg-slate-50">
        <div class="container mx-auto px-6">
          <h2 class="text-4xl font-bold text-center mb-16 text-slate-800">Core Features</h2>
          <div class="grid md:grid-cols-3 gap-10">
            <div class="feature-card bg-white p-8 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <div class="text-3xl text-indigo-600 mb-4">🚀</div>
              <h3 class="text-2xl font-semibold mb-3 text-slate-700">TypeScript</h3>
              <p class="text-slate-600 leading-relaxed">Enjoy type safety and modern JavaScript features for robust, maintainable code.</p>
            </div>
            <div class="feature-card bg-white p-8 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <div class="text-3xl text-indigo-600 mb-4">💡</div>
              <h3 class="text-2xl font-semibold mb-3 text-slate-700">Lit</h3>
              <p class="text-slate-600 leading-relaxed">Build lightweight, fast, and reactive web components with a simple and powerful API.</p>
            </div>
            <div class="feature-card bg-white p-8 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <div class="text-3xl text-indigo-600 mb-4">⚡️</div>
              <h3 class="text-2xl font-semibold mb-3 text-slate-700">Vite</h3>
              <p class="text-slate-600 leading-relaxed">Experience lightning-fast cold starts, HMR, and optimized builds for superior DX.</p>
            </div>
            <div class="feature-card bg-white p-8 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <div class="text-3xl text-indigo-600 mb-4">🎨</div>
              <h3 class="text-2xl font-semibold mb-3 text-slate-700">Tailwind CSS</h3>
              <p class="text-slate-600 leading-relaxed">Rapidly build custom, modern designs with a utility-first CSS framework.</p>
            </div>
            <div class="feature-card bg-white p-8 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <div class="text-3xl text-indigo-600 mb-4">🗺️</div>
              <h3 class="text-2xl font-semibold mb-3 text-slate-700">Routing</h3>
              <p class="text-slate-600 leading-relaxed">Simple client-side routing included to build dynamic single-page applications.</p>
            </div>
            <div class="feature-card bg-white p-8 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <div class="text-3xl text-indigo-600 mb-4">📦</div>
              <h3 class="text-2xl font-semibold mb-3 text-slate-700">Lazy Loading</h3>
              <p class="text-slate-600 leading-relaxed">Components are lazy-loaded by default, ensuring optimal initial load performance.</p>
            </div>
          </div>
        </div>
      </section>

      <section class="cta-section py-24 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div class="container mx-auto px-6 text-center">
          <h2 class="text-4xl font-bold mb-6">Ready to Build Something Amazing?</h2>
          <p class="text-xl mb-10 max-w-2xl mx-auto">
            This template provides a solid, modern foundation for your next web component project.
            Focus on your unique features, not the boilerplate.
          </p>
          <a
            href="https://github.com/thepassle/ts-wc-template"
            target="_blank"
            rel="noopener noreferrer"
            class="bg-white text-indigo-700 font-bold py-4 px-10 rounded-full hover:bg-slate-100 transition duration-300 transform hover:scale-105 text-xl shadow-lg"
          >
            Star on GitHub
          </a>
        </div>
      </section>
    `;
  }
}

customElements.define('app-home', AppHome);

export default AppHome;
