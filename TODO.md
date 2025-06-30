# TODO List for ts-wc-template Improvements

This list tracks potential improvements and fixes for the `ts-wc-template` repository. Items are categorized and prioritized. The overall philosophy is to maintain simplicity in the core template while enhancing developer experience and robustness.

## Immediate Priorities (Core Template Health)

- **`[CRITICAL]`** `[x]` Fix `vite-plugin-component-manifest` production paths:
  - Currently, the dynamic imports generated for production builds in `vite-plugin-component-manifest.ts` (within the `buildStart` hook) seem to point to `.ts` files (e.g., `() => import('./components/${name}/${name}.ts')`).
  - This **must** be corrected to point to the compiled JavaScript assets that Vite produces in the `dist` (or `assets`) directory, including any hashing Vite applies (e.g., `() => import('/assets/component-name.hash.js')`).
  - Reference the `isProduction` flag or `config.command === 'build'` and Vite's `ResolvedConfig` to determine correct output paths.
  - _Investigation concluded this is working as expected; paths are to JS assets._

- **`[MEDIUM]`** `[x]` Correct `npm test` script:
  - The `test` script in `package.json` currently runs `vite build`.
  - This should be changed to `vitest run` (or a similar Vitest command) to execute the actual test suite.
  - _This also included ensuring placeholder tests exist so `vitest run` passes._

- **`[MEDIUM]`** `[ ]` Add detailed JSDoc/TSDoc comments:
  - Improve inline documentation for core modules like `src/core/base-component.ts` and `src/core/router/router.ts`.
  - Explain parameters, return types, and general purpose of key classes and methods. This serves as a form of "context" for developers and potentially tools.

## High Priority Features (Showcasing & Examples)

- **`[HIGH]`** `[ ]` Implement New Example Homepage with Tailwind CSS:
  - Completely redesign the current `home-page` component.
  - Showcase the template's capabilities with a modern, professional design.
  - Integrate Tailwind CSS for styling. This will involve:
    - Adding Tailwind CSS and PostCSS dependencies.
    - Configuring PostCSS to process Tailwind directives.
    - Setting up Tailwind configuration (`tailwind.config.js`) to scan component HTML/TS files for class usage.
    - Updating the build process in `vite.config.ts` to include PostCSS.
    - Ensuring global styles and component-specific styles work harmoniously.
  - The new homepage should be visually appealing and demonstrate common UI patterns.

- **`[HIGH]`** `[ ]` Develop a TODO Application Page:
  - Create a new route and component (e.g., `todo-page`).
  - Implement full CRUD (Create, Read, Update, Delete) functionality for TODO items.
  - Manage TODO list state within the component or a simple service.
  - This will serve as a practical example of a more complex web component, including form handling, event handling, and dynamic list rendering.

## Near-Term Enhancements (Developer Experience & Standardization)

- **`[MEDIUM]`** `[ ]` PWA Capabilities:
  - Integrate `vite-plugin-pwa` or similar to add Service Worker generation and a Web App Manifest.
  - Configure basic pre-caching for core assets and on-demand caching for lazy-loaded routes to enable offline functionality.


- **`[LOW]`** `[x]` Add Linting and Formatting:
  - Integrate ESLint for TypeScript linting.
  - Integrate Prettier for code formatting.
  - Provide base configuration files (e.g., `eslint.config.js`, `.prettierrc.cjs`).
  - Add corresponding npm scripts (e.g., `lint`, `format`). This helps standardize code contributions.
  - _Also includes setting up a CI workflow (`.github/workflows/ci.yml`) for type-checking, linting, testing, and building._

- **`[MEDIUM]`** `[ ]` Review and Ensure GitHub Pages Deployment:
  - Review the existing `.github/workflows/deploy.yml` for GitHub Pages.
  - Ensure it correctly builds and deploys the example application from the template.
  - Update actions, build steps, and configurations as necessary to align with current project structure and best practices.
  - Confirm successful deployment of a working example to GitHub Pages.


- **`[IDEA/HIGH]`** `[ ]` Design and Implement a Core CLI Tool:
  - Scope out essential features for a Node.js CLI (e.g., `ts-wc-cli` or similar).
  - **Core commands:**
    - `generate component <component-name>`: Scaffolds component `.ts`, `.html`, `.css`, and `.test.ts` files adhering to template conventions.
    - `generate service <service-name>`: Scaffolds a service file in `src/services/`.
    - `add route <path> <component-name>`: (More advanced) Modifies `src/main.ts` to register a route for an existing component.
  - This CLI is a key step in standardizing development workflows and improving developer experience.
  - **Sub-Task `[IDEA/MEDIUM]`:** `[ ]` Investigate CLI generating/maintaining "Context Files" (MCP-Lite). For example, a `project-manifest.json` file listing components, routes, services. This structured data could be used by external tools or provide context for AI code generation assistants.

## Future Enhancements (Ecosystem & Features)

- **`[LOW]`** `[ ]` Enhance `vite-plugin-component-manifest` flexibility:
  - Consider adding options to the plugin (e.g., specify different component directories, customize generated file path).

- **`[LOW]`** `[ ]` Document `vite-plugin-component-manifest.ts`:
  - Add more detailed comments within the plugin code.

- **`[LOW]`** `[ ]` Contribution Guidelines:
  - Expand the "Contributing" section in `README.md`.

- **`[LOW]`** `[ ]` Enhance Router capabilities:
  - Support for route parameters (e.g., `/users/:id`).
  - Route guards or navigation lifecycle hooks.

- **`[LOW]`** `[ ]` Inter-component communication examples:
  - Provide examples/guidance in the README (e.g., events, props, simple state store/service).

- **`[LOW]`** `[ ]` Error Handling in Router:
  - Improve `show404` or allow for custom error components.

- **`[LOW]`** `[ ]` Advanced Sample Component:
  - Demonstrate form handling, API calls, service usage.

## Visionary / Long-Term (Advanced Tooling & Architecture)

- **`[VISION/LONG-TERM]`** `[ ]` Model Context Protocol (MCP) Server:
  - Building upon the CLI and "Context Files", explore creating a full MCP server.
  - This server would provide a rich, real-time API about the project's state and conventions, designed for advanced AI development assistants to understand and interact with the codebase deeply.
  - This would be a significant undertaking, pursued if the template ecosystem matures and there's clear demand for such deep AI integration.

Please prioritize items starting from "Immediate Priorities".
