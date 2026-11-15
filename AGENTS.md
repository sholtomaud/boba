# AGENTS.md - Instructions for AI Agents

Welcome, AI Agent! This file provides guidance for working with the `Boba` repository.

## 1. Project Overview

This is a minimalist template repository for building modern web applications using Web Components and TypeScript. It features a client-side router and a store. Unit tests and the CLI run on Node.js v26+ native type stripping with no compile step; Vite serves and bundles the browser code. Do not describe the project as "zero-build" or "no build": claims on the website and in the README must be true of the code as it is.

## 2. Key Technologies

- **TypeScript:** For modern, modular code without a complex build step.
- **Web Components:** For creating reusable custom elements.
- **Client-Side Routing:** Custom router implemented in `src/core/router/router.ts`.
- **CSS Variables:** For themeable and maintainable styles.
- **Playwright:** For end-to-end testing.

## 3. Directory Structure

- `bin/create-boba-app.js`: The scaffolder. Copies `template/` into a new directory.
- `template/`: The app, exactly as users get it — a neutral starter. Make app changes here.
  - `template/src/components/`: Web components, one directory per component (`.ts`, `.html`, `.css`).
  - `template/src/core/`: `base-component.ts`, `store.ts` and `router/router.ts`.
  - `template/src/services/`: DOM-free logic with unit tests alongside.
  - `template/src/main.ts`: Entry point; registers routes.
  - `template/scripts/boba.ts`: The app's CLI (generators, manifest, MCP server).
  - `template/public/`: Static files, including the web manifest and service worker.
  - `template/e2e/`: End-to-end tests using Playwright.
- `site/overlay/`: Pages only the Boba website has (home, docs, about, nav). `site/assemble.js` copies `template/` plus this overlay into `.site/` (git-ignored); that is what deploys to GitHub Pages.
- `test/`: Tests for the scaffolder.

Root npm scripts delegate to the template's scripts (`npm run dev`, `build`, `lint`, `typecheck`, `format`).

## 4. Development Workflow

### 🚨 NON-NEGOTIABLE PRE-COMMIT REQUIREMENTS 🚨

The following commands MUST be run and MUST pass before pushing any commit to GitHub. This is mandatory and cannot be skipped or modified:

1. **Install Dependencies:** `npm install`
2. **Install Playwright Browsers:** `npx playwright install --with-deps` (required for tests)
3. **Type-check and Lint:** `npm run typecheck` and `npm run lint`
4. **Run Unit Tests:** `npm test` (uses node --test; covers the scaffolder and the template)
5. **Run E2E Tests:** `npx playwright test`
6. **Run Site Checks:** `npm run site:check` (the template plus the website's pages)

**ALL of these must complete successfully with zero errors before any git push.**

### Git Workflow & Project Management

Follow the standard feature branch and PR workflow as described in the original AGENTS.md.

## 5. Routing

- Client-side routing is handled by the `Router` class in `template/src/core/router/router.ts`.
- Routes are defined and registered in `template/src/main.ts`.
- The path the app is served from is set at build time (`vite build --base /path/`). Vite writes it into the `<base href>` in `template/index.html`, and the router reads it from there. There is no runtime detection.
- The router handles clicks on in-app links itself; components should not add their own link handlers.

## 6. Component Structure

- Components are located in their own subdirectory within `template/src/components/`.
- A component consists of a `.ts` file for the logic, which imports its `.html` and `.css` files as strings (`?raw`).
- Components extend the `BaseComponent` class.
- `npm run boba -- generate component <tag-name>` (in `template/`) scaffolds one.

## 7. Coding Style & Conventions

- Use TypeScript.
- Mandatory `.ts` extensions for all imports.
- Use kebab-case for custom element tag names.
- Write meaningful commit messages.

---

**Remember:** The goal is simplicity and adherence to web standards. Avoid adding heavy build tools or unnecessary 3rd party dependencies.
