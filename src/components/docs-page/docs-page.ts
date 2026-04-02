import { BaseComponent } from '../../core/base-component.ts';

const html = `
<div class="container mx-auto p-8 max-w-4xl">
  <header class="mb-12 border-b pb-8">
    <h1 class="text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">Documentation</h1>
    <p class="text-2xl text-gray-600 leading-relaxed">Everything you need to know about building minimalist web applications with Boba.</p>
  </header>

  <nav class="mb-12 flex space-x-6 text-sm font-medium text-blue-600 uppercase tracking-widest border-b pb-4">
    <a href="#intro" class="hover:text-blue-800 transition-colors">Intro</a>
    <a href="#components" class="hover:text-blue-800 transition-colors">Components</a>
    <a href="#routing" class="hover:text-blue-800 transition-colors">Routing</a>
    <a href="#state" class="hover:text-blue-800 transition-colors">State Management</a>
  </nav>

  <section id="intro" class="mb-16">
    <h2 class="text-3xl font-bold text-gray-800 mb-6 flex items-center">
      <span class="bg-blue-100 text-blue-600 p-2 rounded-lg mr-4">1</span>
      Getting Started
    </h2>
    <div class="prose max-w-none text-gray-700 leading-relaxed">
      <p class="mb-6">Boba is a zero-build-required framework that leverages the latest browser standards and Node.js v25+ native type stripping. It's built for developers who value simplicity and raw performance.</p>
      <div class="bg-gray-900 text-blue-300 p-6 rounded-xl font-mono text-sm shadow-inner mb-6">
        <pre><span class="text-gray-500"># Scaffolding a new app</span>
npx github:sholtomaud/boba my-boba-app

<span class="text-gray-500"># Navigate and install</span>
cd my-boba-app
npm install

<span class="text-gray-500"># Start developing</span>
npm start</pre>
      </div>
    </div>
  </section>

  <section id="components" class="mb-16">
    <h2 class="text-3xl font-bold text-gray-800 mb-6 flex items-center">
      <span class="bg-green-100 text-green-600 p-2 rounded-lg mr-4">2</span>
      Web Components
    </h2>
    <p class="mb-6 text-gray-700 leading-relaxed text-lg font-light">Components are the building blocks of any Boba app. They are encapsulated using the Shadow DOM and styled with modern CSS.</p>
    <div class="bg-gray-900 text-gray-100 p-6 rounded-xl font-mono text-sm shadow-xl overflow-x-auto">
<pre><span class="text-blue-400">import</span> { BaseComponent } <span class="text-blue-400">from</span> <span class="text-green-300">'../../core/base-component.ts'</span>;

<span class="text-blue-400">const</span> html = <span class="text-green-300">\`&lt;h1 class="text-3xl font-bold"&gt;Hello World&lt;/h1&gt;\`</span>;
<span class="text-blue-400">const</span> css = <span class="text-green-300">\`:host { display: block; }\`</span>;

<span class="text-blue-400">export class</span> HelloComponent <span class="text-blue-400">extends</span> BaseComponent {
  <span class="text-blue-400">static</span> tagName = <span class="text-green-300">'hello-component'</span>;
  <span class="text-blue-400">constructor</span>() {
    <span class="text-blue-400">super</span>(html, css);
  }
}

customElements.define(HelloComponent.tagName, HelloComponent);</pre>
    </div>
  </section>

  <section id="routing" class="mb-16">
    <h2 class="text-3xl font-bold text-gray-800 mb-6 flex items-center">
      <span class="bg-purple-100 text-purple-600 p-2 rounded-lg mr-4">3</span>
      Smart Routing
    </h2>
    <p class="mb-6 text-gray-700 leading-relaxed">The Boba router is built for SPAs and supports path parameters out of the box.</p>
    <div class="bg-gray-900 text-blue-100 p-6 rounded-xl font-mono text-sm shadow-xl overflow-x-auto">
<pre><span class="text-blue-400">const</span> router = Router.getInstance();
router.registerRoute({ path: <span class="text-green-300">'/'</span>, component: <span class="text-green-300">'home-page'</span> });
router.registerRoute({ path: <span class="text-green-300">'/user/:id'</span>, component: <span class="text-green-300">'user-profile'</span> });</pre>
    </div>
  </section>

  <section id="state" class="mb-16">
    <h2 class="text-3xl font-bold text-gray-800 mb-6 flex items-center">
      <span class="bg-red-100 text-red-600 p-2 rounded-lg mr-4">4</span>
      Global State
    </h2>
    <p class="mb-6 text-gray-700 leading-relaxed italic">Built-in reactivity using standard browser events.</p>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="bg-white p-6 rounded-xl shadow-lg border-t-4 border-red-500">
        <h3 class="font-bold text-xl mb-3 text-gray-900">Define Store</h3>
        <code class="block text-sm text-red-600 font-mono mb-4">new Store({ count: 0 })</code>
        <p class="text-sm text-gray-600 leading-relaxed">A central source of truth that emits events whenever the state is updated.</p>
      </div>
      <div class="bg-white p-6 rounded-xl shadow-lg border-t-4 border-blue-500">
        <h3 class="font-bold text-xl mb-3 text-gray-900">React</h3>
        <code class="block text-sm text-blue-600 font-mono mb-4">store.addEventListener('change', ...)</code>
        <p class="text-sm text-gray-600 leading-relaxed">Components automatically subscribe and react to state changes in their init() lifecycle.</p>
      </div>
    </div>
  </section>

  <footer class="mt-24 pt-8 border-t text-center text-gray-500 text-sm">
    &copy; ${new Date().getFullYear()} Boba Framework. Built for the modern web.
  </footer>
</div>
`;

const css = `
:host {
  display: block;
}
`;

export class DocsPageComponent extends BaseComponent {
  static tagName = 'docs-page';
  constructor() {
    super(html, css);
  }
}

if (!customElements.get(DocsPageComponent.tagName)) {
  customElements.define(DocsPageComponent.tagName, DocsPageComponent);
}
