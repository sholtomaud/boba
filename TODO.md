# TODO List for ts-wc-template Improvements

This list tracks potential improvements and fixes for the `ts-wc-template` repository. Items are categorized and prioritized (Critical, Medium, Low, Idea).

## Plugin Enhancements

-   **`[CRITICAL]` Fix `vite-plugin-component-manifest` production paths:**
    -   Currently, the dynamic imports generated for production builds in `vite-plugin-component-manifest.ts` (within the `buildStart` hook) seem to point to `.ts` files (e.g., `() => import('./components/${name}/${name}.ts')`).
    -   This should be corrected to point to the compiled JavaScript assets that Vite produces in the `dist` (or `assets`) directory. The path might need to align with Vite's output hashing if applicable (e.g., `() => import('/assets/component-name.hash.js')`).
    -   Reference the `isProduction` flag or `config.command === 'build'` and Vite's `ResolvedConfig` to determine correct output paths.

-   **`[LOW]` Enhance `vite-plugin-component-manifest` flexibility:**
    -   Consider adding options to the plugin, e.g., to allow users to specify a different directory for components or to customize the generated `components.ts` file path.
    -   Could it generate different types of component stubs or integrate with a CLI for scaffolding?

## Build & Test Process

-   **`[MEDIUM]` Correct `npm test` script:**
    -   The `test` script in `package.json` currently runs `vite build`.
    -   This should be changed to `vitest run` (or a similar Vitest command) to execute the actual test suite.

-   **`[LOW]` Add Linting and Formatting:**
    -   Integrate ESLint for TypeScript linting.
    -   Integrate Prettier for code formatting.
    -   Provide base configuration files (e.g., `.eslintrc.js`, `.prettierrc.js`).
    -   Add corresponding npm scripts (e.g., `lint`, `format`).

## Documentation

-   **`[MEDIUM]` Add detailed JSDoc/TSDoc comments:**
    -   Improve inline documentation for core modules like `src/core/base-component.ts` and `src/core/router/router.ts`.
    -   Explain parameters, return types, and general purpose of key classes and methods.

-   **`[LOW]` Document `vite-plugin-component-manifest.ts`:**
    -   Add comments within the plugin code to explain its logic, especially the production vs. development path generation.

-   **`[LOW]` Contribution Guidelines:**
    -   Expand the "Contributing" section in `README.md` with basic guidelines for reporting issues and submitting PRs.

## Component & Router Features

-   **`[LOW]` Enhance Router capabilities:**
    *   Consider adding support for route parameters (e.g., `/users/:id`).
    *   Explore adding route guards or navigation lifecycle hooks.
    *   Provide clearer feedback or events for programmatic navigation success/failure.

-   **`[LOW]` Inter-component communication examples:**
    *   Provide examples or guidance in the README on how components can communicate with each other (e.g., via events, props if parent-child, or a simple state store/service).

-   **`[LOW]` Error Handling in Router:**
    *   Improve the `show404` method or provide mechanisms for more sophisticated error display for failed component loads.

## Developer Experience

-   **`[LOW]` Advanced Sample Component:**
    *   Create a sample component that demonstrates more advanced features like:
        *   Handling user input and forms.
        *   Fetching data from a mock API.
        *   Using a service from `src/services/`.

## CLI Tool (Speculative Idea from README)

-   **`[IDEA]` Design and Implement a CLI Tool:**
    *   Scope out features for a Node.js CLI (e.g., `ts-wc-cli`).
    *   `generate component <component-name>`: Scaffolds HTML, CSS, TS, and test files.
    *   `generate service <service-name>`: Scaffolds a service file.
    *   Could potentially register routes automatically if a component is generated.
    *   Investigate packaging as a single executable.

Please prioritize the `[CRITICAL]` and `[MEDIUM]` items first.
