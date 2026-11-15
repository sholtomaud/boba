# Boba App

A web app built with [Boba](https://github.com/sholtomaud/boba): Web Components and TypeScript, with no build step for the language. Requires Node.js 26 or higher.

```bash
npm install
```

```bash
npm start
```

| Script | Description |
| --- | --- |
| `npm start` / `npm run dev` | Start the dev server |
| `npm run build` | Build static files into `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm test` | Unit tests (`node --test`) |
| `npm run e2e` | End-to-end tests (Playwright). Run `npx playwright install` once first; Firefox and WebKit are tested when installed |
| `npm run typecheck` / `npm run lint` / `npm run format` | Static checks and formatting |
| `npm run boba -- <command>` | `generate component`, `generate service`, `add route`, `manifest`, `mcp` |

## Where things are

- `src/main.ts` — routes.
- `src/components/` — one folder per component: `name.ts`, `name.html`, `name.css`.
- `src/services/` — logic that needs no DOM, with unit tests alongside.
- `src/core/` — the base component, router and store. They are part of your app: read them, change them.
- `public/` — static files, including the web manifest, icons and service worker.
- `e2e/` — Playwright tests.

The `todo-page` and `users-page` components are examples; delete them and their routes when you no longer need them.

Guides: <https://sholtomaud.github.io/boba/docs>
