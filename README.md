# Boba Monorepo

This repository contains the ecosystem for Boba, a modern framework for building web applications with TypeScript and Web Components.

## What's Inside?

This is a monorepo containing the following packages:

*   **`packages/cli`**: The command-line interface for Boba. This tool, named `create-boba-app`, is used to generate new Boba projects.
*   **`packages/template-app`**: The actual template application that the CLI uses as a blueprint. It's a fully functional Vite-powered web component application that showcases Boba's features.

## Getting Started

### Creating a New Boba Application

The primary way to use Boba is via the `create-boba-app` CLI tool.

```bash
# Using npx to run the CLI from npm (once published)
npx create-boba-app my-new-project

# Or, for development, running directly from GitHub
npx github:sholtomaud/boba packages/cli my-new-project
```

### Developing the Boba Ecosystem

If you want to contribute to Boba itself, you can work within this monorepo.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/sholtomaud/boba.git
    cd boba
    ```

2.  **Install dependencies for all packages:**
    *   Navigate to `packages/template-app` and run `npm install`.
    *   Navigate to `packages/cli` and run `npm install`.
    *(Note: In the future, we can add a root-level `package.json` and use npm workspaces to manage this more easily.)*

3.  **Work on the desired package:**
    *   To work on the template application, navigate to `packages/template-app` and use its scripts (e.g., `npm run dev`).
    *   To work on the CLI, navigate to `packages/cli` and use its scripts (e.g., `npm run dev`).

## About the Template App (`packages/template-app`)

The template app is a complete project that demonstrates the core philosophies of Boba:

-   **Modularity:** Build your application as a collection of encapsulated Web Components.
-   **Lazy Loading:** Components are loaded on demand, improving initial application load times.
-   **Modern Tooling:** Leverages Vite for a blazing fast development experience and optimized builds, with Vitest for testing.
-   **Type Safety:** Utilizes TypeScript for robust and maintainable code.

For more details on the template's architecture and how to use it, see the README inside the `packages/template-app` directory.

## Contributing

Contributions are welcome! Please see `TODO.md` for current priorities. If you have ideas for improvements or find bugs, please open an issue or submit a pull request.
