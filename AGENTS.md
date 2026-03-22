# AGENTS.md - Instructions for AI Agents

Welcome, AI Agent! This file provides guidance for working with the `Boba` repository.

## 1. Project Overview

This is a minimalist template repository for building modern web applications using Web Components and plain JavaScript. It features a client-side router and is set up for a zero-build development workflow.

## 2. Key Technologies

- **JavaScript (ES Modules):** For modern, modular code without a build step.
- **Web Components:** For creating reusable custom elements.
- **Client-Side Routing:** Custom router implemented in `src/core/router/router.js`.
- **CSS Variables:** For themeable and maintainable styles.
- **Playwright:** For end-to-end testing.

## 3. Directory Structure

- `src/`: Contains all source code.
  - `src/components/`: Houses individual web components, typically one directory per component.
  - `src/core/`: Core application logic.
    - `src/core/base-component.js`: A base class that components can extend.
    - `src/core/router/`: Client-side routing implementation.
  - `src/main.js`: The main entry point of the application.
  - `src/styles/`: Global styles and CSS variables.
- `index.html`: The main HTML entry point for the application.
- `e2e/`: End-to-end tests using Playwright.

## 4. Development Workflow

### 🚨 NON-NEGOTIABLE PRE-COMMIT REQUIREMENTS 🚨

The following commands MUST be run and MUST pass before pushing any commit to GitHub. This is mandatory and cannot be skipped or modified:

1. **Install Dependencies:** `npm install`
2. **Install Playwright Browsers:** `npx playwright install --with-deps` (required for tests)
3. **Run CLI Tests:** `npm test` (uses node --test)
4. **Run E2E Tests:** `npx playwright test`

**ALL of these must complete successfully with zero errors before any git push.**

### Git Workflow & Project Management

Follow the standard feature branch and PR workflow as described in the original AGENTS.md.

## 5. Routing

- Client-side routing is handled by the `Router` class in `src/core/router/router.js`.
- Routes are defined and registered in `src/main.js`.
- The router uses `window.BOBA_BASE_URL` to correctly determine the application-specific path.

## 6. Component Structure

- Components are located in their own subdirectory within `src/components/`.
- A component consists of a `.js` file for the logic, which includes the HTML and CSS as strings.
- Most components extend the `BaseComponent` class.

## 7. Coding Style & Conventions

- Use modern ES6+ JavaScript.
- Mandatory `.js` extensions for all imports.
- Use kebab-case for custom element tag names.
- Write meaningful commit messages.

---

**Remember:** The goal is simplicity and adherence to web standards. Avoid adding heavy build tools or unnecessary 3rd party dependencies.
