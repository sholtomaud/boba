# Boba - A Minimalist Web Component Framework

**Boba** is a ultra-minimalist template for building fast, modular web applications using plain JavaScript and Web Components. It requires **zero build steps** and uses native browser features and Node.js v24+ capabilities.

## Create a New Boba App

You can create a new Boba application using `npx`.

```bash
npx github:sholtomaud/boba <your-app-name>
```

This will create a new directory called `<your-app-name>` with a new Boba project.

## Core Philosophy

- **No Build Step:** Browsers run the code directly. No Vite, no Webpack, no Babel.
- **Native Standards:** Uses standard ES Modules, Web Components (Shadow DOM), and CSS.
- **Minimal Dependencies:** Only uses `playwright` for testing and `serve` for local development.
- **Node.js v24+:** Leverages native TypeScript stripping if you choose to use `.ts` (though this template uses `.js` for simplicity).

## Key Features

- **Web Component-Based Architecture:** True encapsulation with Shadow DOM.
- **`BaseComponent` (`src/core/base-component.js`):** A foundational class that simplifies component creation.
- **Client-Side Router (`src/core/router/router.js`):** A lightweight, singleton router that dynamically loads components.
- **Playwright for Testing:** Modern E2E testing out of the box.

## Getting Started

### Prerequisites

- Node.js v24 or higher.

### Installation

1.  Navigate to the project directory:
    ```bash
    cd your-project-name
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Install Playwright browsers:
    ```bash
    npx playwright install --with-deps
    ```

### Available Scripts

- **`npm start`**: Starts a local static file server.
- **`npm test`**: Runs E2E tests using Playwright.

## Developing Your Own Application

### Project Structure Overview

- **`src/components/`**: Your application's web components.
- **`src/core/`**: Core modules (BaseComponent, Router).
- **`src/main.js`**: Main entry point.
- **`index.html`**: The main HTML file.

### Creating a New Component

1.  **Create a new directory** under `src/components/`, e.g., `src/components/user-profile/`.
2.  **Create the component file:** `user-profile.js`.
3.  **Implement the component:**

    ```javascript
    const html = `<h1>User Profile</h1>`;
    const css = `h1 { color: blue; }`;
    import { BaseComponent } from '../../core/base-component.js';

    export class UserProfileComponent extends BaseComponent {
      static tagName = 'user-profile';
      constructor() {
        super(html, css);
      }
      init() {
        console.log('Profile initialized');
      }
    }

    if (!customElements.get(UserProfileComponent.tagName)) {
      customElements.define(UserProfileComponent.tagName, UserProfileComponent);
    }
    ```

### Adding Routes

Open `src/main.js` and register a new route:

```javascript
const router = Router.getInstance();
router.registerRoute({ path: '/profile', component: 'user-profile' });
```

## Contributing

Contributions are welcome! Please see `TODO.md` for current priorities.
