import { BaseComponent, html, css } from '../../core/base-component.ts';

const template = html`
<div class="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 text-center">
  <div class="max-w-4xl w-full">
    <header class="mb-12">
      <h1 class="text-7xl font-extrabold text-gray-900 mb-4 tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">Boba</h1>
      <p class="text-2xl text-gray-600 font-medium max-w-2xl mx-auto leading-relaxed">A minimalist framework for the modern web. Ultra-fast, zero-build, and purely standards-based.</p>
    </header>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
      <div class="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow border border-gray-100 group">
        <div class="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
        </div>
        <h3 class="text-xl font-bold text-gray-900 mb-2">Fast</h3>
        <p class="text-gray-600">Native performance with minimal overhead.</p>
      </div>
      <div class="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow border border-gray-100 group">
        <div class="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mb-6 group-hover:bg-green-600 group-hover:text-white transition-colors">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
        </div>
        <h3 class="text-xl font-bold text-gray-900 mb-2">Standards</h3>
        <p class="text-gray-600">Built on Web Components and ES Modules.</p>
      </div>
      <div class="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow border border-gray-100 group">
        <div class="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mb-6 group-hover:bg-purple-600 group-hover:text-white transition-colors">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
        </div>
        <h3 class="text-xl font-bold text-gray-900 mb-2">Modern</h3>
        <p class="text-gray-600">TypeScript native with zero build pipeline.</p>
      </div>
    </div>

    <div class="bg-gray-900 text-white p-10 rounded-3xl shadow-2xl mb-16 relative overflow-hidden">
      <div class="relative z-10">
        <h2 class="text-3xl font-bold mb-6">System Status</h2>
        <div class="flex flex-wrap justify-center gap-6">
          <div class="flex items-center space-x-3 bg-gray-800 px-6 py-3 rounded-full border border-gray-700">
            <span class="flex h-3 w-3 relative">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span class="font-mono text-sm">Unit Tests: </span>
            <span class="text-green-400 font-bold">PASSING</span>
          </div>
          <div class="flex items-center space-x-3 bg-gray-800 px-6 py-3 rounded-full border border-gray-700">
            <span class="flex h-3 w-3 relative">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span class="font-mono text-sm">E2E Tests: </span>
            <span class="text-green-400 font-bold">PASSING</span>
          </div>
          <div class="flex items-center space-x-3 bg-gray-800 px-6 py-3 rounded-full border border-gray-700">
            <span class="text-gray-400 font-mono text-sm uppercase tracking-wider">Version: </span>
            <span id="version-tag" class="text-blue-400 font-bold">v1.0.0</span>
          </div>
        </div>
      </div>
      <div class="absolute -top-24 -right-24 w-64 h-64 bg-blue-500 opacity-10 rounded-full blur-3xl"></div>
      <div class="absolute -bottom-24 -left-24 w-64 h-64 bg-indigo-500 opacity-10 rounded-full blur-3xl"></div>
    </div>

    <footer class="text-gray-400 text-sm flex items-center justify-center space-x-4">
      <a href="/docs" class="hover:text-blue-600 underline">Read Documentation</a>
      <span>&bull;</span>
      <a href="https://github.com/sholtomaud/boba" class="hover:text-blue-600 underline">View on GitHub</a>
    </footer>
  </div>
</div>
`;

const style = css`
:host {
  display: block;
}
`;

export class HomeComponent extends BaseComponent {
  static tagName = 'home-page';

  constructor() {
    super(template, style);
  }

  init() {
    this.shadowRoot?.getElementById('version-tag')?.addEventListener('click', () => {
      console.log('Boba Framework v1.0.0 initialized');
    });
  }
}

if (!customElements.get(HomeComponent.tagName)) {
  customElements.define(HomeComponent.tagName, HomeComponent);
}
