# 🧋 Boba

**Simplicity in every bubble.** Boba is an ultra-minimalist, standards-based web framework that pairs native browser capabilities (Custom Elements, ES Modules) with Node.js v25+'s native TypeScript stripping — no build step, no virtual DOM, near-zero dependencies.

### 🔴 [Live Demo →](https://sholtomaud.github.io/boba/)

[![CI](https://github.com/sholtomaud/boba/actions/workflows/ci.yml/badge.svg)](https://github.com/sholtomaud/boba/actions/workflows/ci.yml)
[![Deploy to GitHub Pages](https://github.com/sholtomaud/boba/actions/workflows/deploy.yml/badge.svg)](https://github.com/sholtomaud/boba/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](#license)
[![Node](https://img.shields.io/badge/node-%3E%3D25-brightgreen)](https://nodejs.org)

---

## Table of Contents

- [Why Boba](#why-boba)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Anatomy of a Component](#anatomy-of-a-component)
- [Routing](#routing)
- [Global State](#global-state)
- [Available Scripts](#available-scripts)
- [Testing](#testing)
- [Developing Boba Itself](#developing-boba-itself)
- [Contributing](#contributing)
- [License](#license)

## Why Boba

- **Build-less workflow** — Node.js v25+ native type stripping means your TypeScript runs almost as-is. Vite is used in dev/build purely for convenience (HMR, bundling), not because the language needs transpiling.
- **Native standards, not abstractions** — Custom Elements, tagged template literals, and standard lifecycle callbacks instead of a framework-specific component model or virtual DOM diffing.
- **Near-zero runtime dependencies** — no React, no Lit, no massive `node_modules` tree. Smaller install, smaller attack surface, no framework deprecation treadmill.
- **A router and a store, and that's it** — a lightweight regex-based client router and an `EventTarget`-backed global store cover the two things most small apps actually need.

Read more on the [live demo's About page](https://sholtomaud.github.io/boba/about).

## Quick Start

Scaffold a new app with `npx` — no global install required:

```bash
npx github:sholtomaud/boba my-app
cd my-app
npm install
npm start
```

This drops you into a ready-to-go Boba project (see [Project Structure](#project-structure)) with a dev server running on Vite.

### Prerequisites

- Node.js v25 or higher

## Project Structure

```
src/
├── components/            # Your app's web components, one folder per component
│   └── home-page/
│       ├── home-page.html  # Markup
│       ├── home-page.css   # Styles (:host-scoped)
│       └── home-page.ts    # Component class, wires html/css together
├── core/
│   ├── base-component.ts   # BaseComponent — the class every component extends
│   └── router/router.ts    # Lightweight client-side router
├── store/                  # App-level Store instances (EventTarget-based state)
├── styles/                 # Global CSS (Tailwind entry point)
└── main.ts                 # Entry point: registers routes, boots the router
```

## Anatomy of a Component

Every component lives in its own folder as three files: markup, styles, and logic — no inline template strings.

```
src/components/user-profile/
├── user-profile.html
├── user-profile.css
└── user-profile.ts
```

```html
<!-- user-profile.html -->
<h1>User Profile</h1>
```

```css
/* user-profile.css */
:host {
  display: block;
}
h1 {
  color: blue;
}
```

```typescript
// user-profile.ts
import { BaseComponent } from '../../core/base-component.ts';
import template from './user-profile.html?raw';
import style from './user-profile.css?raw';

export class UserProfileComponent extends BaseComponent {
  static tagName = 'user-profile';

  constructor() {
    super(template, style);
  }

  init() {
    console.log('Profile initialized');
  }
}

if (!customElements.get(UserProfileComponent.tagName)) {
  customElements.define(UserProfileComponent.tagName, UserProfileComponent);
}
```

The `.html`/`.css` files are pulled in via Vite's [`?raw` import](https://vite.dev/guide/assets.html#importing-asset-as-string), so they stay plain, tool-friendly markup and CSS — no template-literal escaping, and syntax highlighting works as expected in your editor.

`:host` in a component's CSS is automatically scoped to that component's tag name by `BaseComponent`, so styles don't leak across components even though everything renders in the light DOM.

### When markup is dynamic

Not every component is static markup. `todo-page` renders a list that changes with app state (add/toggle/delete/filter). Rather than building HTML strings with loops and conditionals in TypeScript, it defines a `<template>` for one list item inside its `.html` file, then clones and populates that template imperatively in `.ts` using standard DOM APIs (`cloneNode`, `classList`, `textContent`). See [`src/components/todo-page/`](src/components/todo-page/) for a complete example of this pattern.

## Routing

Register routes in `main.ts` (or wherever you boot the app):

```typescript
import { Router } from './core/router/router.ts';
import './components/user-profile/user-profile.ts';

const router = Router.getInstance();
router.registerRoute({ path: '/', component: 'home-page' });
router.registerRoute({ path: '/profile', component: 'user-profile' });
router.registerRoute({ path: '/user/:id', component: 'user-profile' }); // dynamic params
```

## Global State

`Store` is a small `EventTarget`-based reactive store — no reducers, no middleware:

```typescript
import { Store } from './core/store.ts';

export const appStore = new Store({ count: 0 });

// anywhere in a component:
appStore.addEventListener('change', (e) => {
  console.log('new state:', e.detail);
});
appStore.setState({ count: appStore.getState().count + 1 });
```

## Available Scripts

| Script | Description |
| --- | --- |
| `npm run dev` / `npm start` | Start the Vite dev server (`--host`, so it's reachable from other devices/containers on your network) |
| `npm run build` | Build optimized static assets for production |
| `npm test` | Run unit tests (`node --test`) |
| `npm run e2e` | Run the Playwright end-to-end suite |

## Testing

- **Unit tests** run directly on TypeScript source via `node --test` — no compilation step.
- **End-to-end tests** use [Playwright](https://playwright.dev/), covering both the Vite dev server and a production build served statically. Every run captures a screenshot per test into the HTML report (`playwright-report/index.html`), so you can visually confirm a change works, not just that assertions passed.

```bash
npm test        # unit tests
npm run e2e      # e2e tests (starts dev + production servers automatically)
```

## Developing Boba Itself

The commands above are what a project *generated by* Boba uses. This repository (the framework/site source, not a generated app) additionally ships a `Makefile` that runs everything inside a reproducible container (via Apple's `container` CLI), so contributors don't need Node, Playwright, or Tailwind installed on the host:

```bash
make image       # build the dev container image (once, or after Containerfile changes)
make install     # npm install, inside the container
make dev         # Vite dev server on http://localhost:5173
make build-app   # production build
make test-unit   # unit tests
make test        # Playwright e2e tests
make clean       # remove node_modules, dist, and .vite
```

## Contributing

Contributions are welcome! Check [`TODO.md`](TODO.md) for current priorities, and open a PR against `main`.

## License

MIT
