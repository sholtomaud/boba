# 🧋 Boba

**Simplicity in every bubble.** Boba is a minimalist, standards-based starting point for web apps: native Web Components (Custom Elements, ES modules) in the browser, and TypeScript that Node.js v26+ runs without a compile step. No framework runtime, no virtual DOM, zero runtime dependencies.

### 🔴 [Website →](https://sholtomaud.github.io/boba/)

[![CI](https://github.com/sholtomaud/boba/actions/workflows/ci.yml/badge.svg)](https://github.com/sholtomaud/boba/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](#license)
[![Node](https://img.shields.io/badge/node-%3E%3D26-brightgreen)](https://nodejs.org)

---

## Table of Contents

- [Why Boba](#why-boba)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Anatomy of a Component](#anatomy-of-a-component)
- [Routing](#routing)
- [Global State](#global-state)
- [How Components Talk to Each Other](#how-components-talk-to-each-other)
- [Services, Forms and API Calls](#services-forms-and-api-calls)
- [The `boba` CLI](#the-boba-cli)
- [Offline and Installable (PWA)](#offline-and-installable-pwa)
- [Available Scripts](#available-scripts)
- [Testing](#testing)
- [Deploying](#deploying)
- [Stability and Upgrades](#stability-and-upgrades)
- [Developing Boba Itself](#developing-boba-itself)
- [Contributing](#contributing)
- [License](#license)

## Why Boba

- **No framework runtime** — components are native Custom Elements with `<template>` elements and standard lifecycle callbacks. The only code that reaches the browser is yours plus a router, a store and a base class you can read in a sitting. An app has zero runtime dependencies.
- **No compile step in Node** — Node.js v26+ strips types natively, so unit tests and the project CLI run straight from TypeScript source.
- **A short, plain toolchain** — the browser cannot run TypeScript, so Vite serves the app in development and bundles it for production, and Tailwind compiles the styles. That is the whole build; there is no framework compiler or plugin stack on top.
- **A router and a store, and that's it** — a lightweight regex-based client router and an `EventTarget`-backed global store cover the two things most small apps actually need.

What Boba does not do: it has no data binding or declarative rendering. Components update their own DOM when state changes, which is simple and explicit but more code than a framework needs. See the [roadmap](TODO.md).

Read more on the [website's About page](https://sholtomaud.github.io/boba/about).

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

- Node.js v26 (LTS) or higher

## Project Structure

```
index.html                  # Entry page; sets the app's base URL
public/                     # Static files: icons, web manifest, service worker, data
scripts/boba.ts             # Project CLI: generators, manifest, MCP server
e2e/                        # Playwright end-to-end tests
src/
├── components/             # Your app's web components, one folder per component
│   └── home-page/
│       ├── home-page.html  # Markup
│       ├── home-page.css   # Styles (:host-scoped)
│       └── home-page.ts    # Component class, wires html/css together
├── core/
│   ├── base-component.ts   # BaseComponent — the class every component extends
│   ├── store.ts            # Store — EventTarget-based state
│   └── router/router.ts    # Lightweight client-side router
├── services/               # DOM-free logic: API calls, validation
├── styles/                 # Global CSS (Tailwind entry point)
└── main.ts                 # Entry point: registers routes, boots the router
```

## Anatomy of a Component

Every component lives in its own folder as three files: markup, styles, and logic — no inline template strings. `npm run boba -- generate component user-profile` creates them for you.

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

Not every component is static markup. `todo-page` renders a list that changes with app state (add/toggle/delete/filter). Rather than building HTML strings with loops and conditionals in TypeScript, it defines a `<template>` for one list item inside its `.html` file, then clones and populates that template imperatively in `.ts` using standard DOM APIs (`cloneNode`, `classList`, `textContent`). See [`template/src/components/todo-page/`](template/src/components/todo-page/) for a complete example of this pattern.

## Routing

Register routes in `main.ts`:

```typescript
import { Router } from './core/router/router.ts';

const router = Router.getInstance();
router.notFound = 'not-found-page'; // component shown for unknown URLs
router.registerRoute({ path: '/', component: 'home-page' });
router.registerRoute({ path: '/user/:name', component: 'user-page' });
router.start();
```

- **Lazy loading** — a route's component is imported from `src/components/<tag>/<tag>.ts` the first time it is shown.
- **Links** — write plain `<a href="/docs">` anywhere. The router handles the click (no page reload); links with `target`, external links and ctrl/cmd-clicks are left to the browser. From code, call `Router.getInstance().navigate('/docs')`.
- **Parameters** — `/user/:name` matches `/user/ada`. The component receives the value as a property (`this.name`), plus `this.params` and `this.query` (the parsed query string), all set before `init()` runs.
- **Guards** — `beforeEnter` runs before a route is shown. Return `false` to cancel, a path to redirect, or nothing to continue. It may be async.

  ```typescript
  router.registerRoute({
    path: '/account',
    component: 'account-page',
    beforeEnter: () => (isLoggedIn() ? true : '/login'),
  });
  ```

- **Navigation event** — the router is an `EventTarget` and dispatches `navigate` (detail: `{ path, params, query }`) after each navigation. `nav-page` uses it to highlight the current link.
- **Errors** — an unknown URL, or a component that fails to load, shows the `router.notFound` component (a plain heading if you don't set one).
- **Base URL** — routes are always written without the path the app is served from. An app served from a sub-path is built for it (`npm run build -- --base /my-app/`); see [Deploying](#deploying).

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

## How Components Talk to Each Other

There is no framework-specific mechanism — use the platform, picking the narrowest tool that fits:

| Direction | Use | Example |
| --- | --- | --- |
| Parent → child | **Properties** set on the element | `card.user = user` — the router passes route params this way |
| Child → parent | **Events** that bubble | `this.dispatchEvent(new CustomEvent('user-selected', { detail: user, bubbles: true }))` |
| Unrelated components | **A shared `Store`** exported from a module | both import `appStore`; one calls `setState`, the other listens for `change` |
| Component → logic | **A service** (plain functions in `src/services/`) | `await fetchUsers()` |

A parent listens for a child's events on itself, so it doesn't need a reference to the child — and `delegate()` keeps working when children are re-rendered:

```typescript
// in the parent's init()
this.addEventListener('user-selected', (e) => {
  this.querySelector('user-card').user = (e as CustomEvent).detail;
});
this.delegate('click', '.delete', (event, button) => this.remove(button.dataset.id));
```

A component renders its template and runs `init()` once, the first time it is connected. Moving it (appending it to another parent) keeps its markup and state. Subscribe to long-lived objects (a shared store, the router, `window`) in `connected()`, which runs on every connection, and remove those listeners in `disconnectedCallback()`. A removed component then leaves nothing behind, and a moved one keeps working. [`app-nav`](template/src/components/nav-page/nav-page.ts) does this with the router:

```typescript
#onNavigate = (event: Event) => { /* mark the current link */ };
connected() {
  Router.getInstance().addEventListener('navigate', this.#onNavigate);
}
disconnectedCallback() {
  Router.getInstance().removeEventListener('navigate', this.#onNavigate);
}
```

## Services, Forms and API Calls

[`users-page`](template/src/components/users-page/) is a worked example of the patterns a real page needs:

- **Service** — [`user-service.ts`](template/src/services/user-service.ts) fetches the data and holds the validation rule. It never touches the DOM, so it is unit-tested with `node --test` by passing in a stand-in for `fetch`.
- **API call** — the component awaits the service in `init()`, with loading and error states in a `role="status"` element.
- **Form handling** — a native `<form>`: `required`, `minlength` and `pattern` are validated by the browser, values are read with `FormData`, and the app's own rule is reported through the same UI with `setCustomValidity()`.

## The `boba` CLI

Every app includes a small, dependency-free CLI ([`scripts/boba.ts`](template/scripts/boba.ts)) that Node runs directly:

```bash
npm run boba -- generate component user-card   # src/components/user-card/{.ts,.html,.css}
npm run boba -- generate service cart-service  # src/services/cart-service.ts + unit test
npm run boba -- add route /cart user-card      # registers the route in src/main.ts
npm run boba -- manifest                       # components, services and routes as JSON
npm run boba -- mcp                            # the same, as an MCP server
```

`manifest` is read from the source each time, so it cannot go stale — pipe it to a file if a tool wants one.

`mcp` serves the generators and the manifest to AI coding assistants over the [Model Context Protocol](https://modelcontextprotocol.io) (stdio). To use it, register the command in your assistant's MCP settings, for example:

```json
{ "mcpServers": { "boba": { "command": "node", "args": ["scripts/boba.ts", "mcp"] } } }
```

Because the script lives in your project, you can change what it generates.

## Offline and Installable (PWA)

Apps are installable and work offline with no plugin:

- [`public/manifest.webmanifest`](template/public/manifest.webmanifest) and the icons in `public/` make the app installable. Replace `favicon.svg`, `icon-192.png` and `icon-512.png` with your own.
- [`public/sw.js`](template/public/sw.js) is a ~50-line service worker, registered in production builds only. It always tries the network first, so a new deploy is picked up immediately, and falls back to its cache when offline. Pages are cached as they are visited.

To opt out, delete `sw.js` and its registration in `main.ts`.

## Available Scripts

| Script | Description |
| --- | --- |
| `npm run dev` / `npm start` | Start the Vite dev server (`--host`, so it's reachable from other devices/containers on your network) |
| `npm run build` | Build optimized static assets into `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm test` | Run unit tests (`node --test`) |
| `npm run e2e` | Run the Playwright end-to-end suite |
| `npm run typecheck` | Type-check with `tsc` |
| `npm run lint` / `npm run format` | Lint with oxlint and check / apply Prettier formatting |
| `npm run boba -- <command>` | Generators and project manifest (see above) |

## Testing

- **Unit tests** run directly on TypeScript source via `node --test` — no compilation step.
- **End-to-end tests** use [Playwright](https://playwright.dev/), covering both the Vite dev server and a production build in Chromium, plus the production build in Firefox and WebKit when those browsers are installed (`npx playwright install`; CI always runs all three). Every run captures a screenshot per test into the HTML report (`playwright-report/index.html`), so you can visually confirm a change works, not just that assertions passed.

```bash
npm test
```

```bash
npm run e2e
```

## Deploying

`npm run build` produces a static `dist/` to serve from the root of a domain. The host must serve `index.html` for unknown paths so deep links reach the router.

If the app is served from a sub-path, say so when building:

```bash
npm run build -- --base /my-app/
```

That one setting is used for the asset URLs, the router, and the relative URLs the app requests (through the `<base>` element in `index.html`).

For **GitHub Pages** project sites the sub-path is the repository name. Build with `--base /<repository>/`, copy `dist/index.html` to `dist/404.html` (Pages serves it for unknown paths) and publish `dist/`. [`ci.yml`](.github/workflows/ci.yml) in this repository does that for the Boba website and is a working example to adapt.

### Content Security Policy

`index.html` ships a Content Security Policy that only allows scripts from the app's own origin: no inline scripts and no `'unsafe-inline'`. Styles still allow `'unsafe-inline'`, because components add their `<style>` elements at runtime.

## Stability and Upgrades

Boba follows [Semantic Versioning](https://semver.org) from 1.0.0; changes are listed in [`CHANGELOG.md`](CHANGELOG.md). The public API, which will not change incompatibly within a major version, is:

- `BaseComponent` — the constructor, `init()`, `delegate()` and `:host` style scoping.
- `Router` — `getInstance()`, `registerRoute()`, `start()`, `navigate()`, `notFound`, the `navigate` event, and what a routed component receives (`params`, `query`, and route parameters as properties).
- `Store` — `getState()`, `setState()` and the `change` event.
- The `npm run boba` commands and the shape of `manifest`'s output.
- The `--base` build option as the one place the app's path is set.

**A new app is a copy, not a dependency.** `create-boba-app` copies these files into your project and they are yours from then on: there is no `boba` package to update, and a newer Boba release does not change an existing app. To pick up a fix, compare your `src/core/` with the current [`template/src/core/`](template/src/core/) and apply what you want; the changelog says what changed and why.

## Developing Boba Itself

This repository holds the scaffolder, the app it scaffolds, and the Boba website:

```
bin/create-boba-app.js   # the scaffolder: copies template/ into a new directory
template/                # the app, exactly as users get it
site/overlay/            # the website's own pages: home, docs, about, nav
site/assemble.js         # builds the website's source in .site/ (template + overlay)
test/                    # tests for the scaffolder
```

`template/` is the single source for the app. The root npm scripts run the template's own scripts, so `npm run dev`, `npm test`, `npm run e2e`, `npm run lint` and `npm run typecheck` at the root exercise exactly what a generated app contains (root `npm test` also tests the scaffolder, from a packed tarball).

The website is that same app with a few pages laid over it, so it always runs on the current template:

| Script | Description |
| --- | --- |
| `npm run site:dev` | Assemble the site and start its dev server. Re-run after editing `site/overlay/` or `template/` |
| `npm run site:build` | Assemble and build the site into `.site/dist/` |
| `npm run site:check` | Assemble, type-check and run the app's and the site's e2e tests against it |

When the site is assembled on GitHub Actions, the commit and workflow run are recorded in `data/build.json`, and the home page shows them. Local builds have no record and show no status.

A `Makefile` runs everything inside a reproducible container (via Apple's `container` CLI), so contributors don't need Node or Playwright installed on the host:

```bash
make image       # build the dev container image (once, or after Containerfile changes)
make install     # npm install, inside the container
make dev         # Vite dev server on http://localhost:5173
make build-app   # production build
make test-unit   # unit tests
make test        # Playwright e2e tests
make clean       # remove node_modules and build output
```

## Contributing

Contributions are welcome. Boba's value is what it leaves out, so the bar for a change is:

- **Platform first.** Prefer a browser or Node built-in over a dependency, and a few lines of code over a plugin. New dependencies need a strong reason.
- **Runs under Node's type stripping.** Code must run under Node's native type stripping: erasable TypeScript syntax only, and `.ts` extensions on every import.
- **One component, one folder.** `name.ts`, `name.html`, `name.css`; kebab-case tag names; styles scoped with `:host`.
- **Logic without the DOM goes in `src/services/`** with a `node --test` unit test next to it. Behaviour in the browser is covered by a Playwright test in `e2e/`.

Workflow:

1. Fork, then branch from `main`.
2. Make the change in `template/` (the app), `bin/` (the scaffolder) or `site/overlay/` (the website's pages), with tests.
3. Run the checks — all of them must pass, and CI runs the same ones:

   ```bash
   npm install
   ```

   ```bash
   npm run typecheck && npm run lint && npm test && npm run e2e && npm run site:check
   ```

4. Open a pull request against `main` describing what changed and why. Keep it focused: one concern per PR.

The work remaining before 1.0.0 is listed in [`TODO.md`](TODO.md). Bugs and other ideas are tracked in [GitHub Issues](https://github.com/sholtomaud/boba/issues).

## License

MIT
