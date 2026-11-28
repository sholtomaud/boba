# TODO

`v1.0.0` is released. The supported install path is `npx github:sholtomaud/boba <app>`; publishing to npm is not planned, so releases are git tags and GitHub Releases managed by Release Please in `.github/workflows/ci.yml`.

## Housekeeping

- `[ ]` **Retire or update `docs/`.** The two dated review documents describe an earlier layout of the repository.

## Roadmap (after 1.0)

- `[ ]` **Extensions.** Optional features added to an app by copying files into it, in keeping with "an app is a copy, not a dependency": `npm run boba -- add <name>`, fetched from this repository.
  - `tailwind` — Tailwind as an opt-in rather than part of the starter, which then ships plain CSS.
  - `pwa` — the web manifest, icons and service worker, moved out of the starter.
  - `sync` — offline-first data: the `Store` API backed by IndexedDB, an outbox of changes made offline, and a small sync-adapter interface (pull since a checkpoint, push changes) with a REST adapter first. Conflict handling is one explicit rule (last write wins per record, with a hook to override), not CouchDB-style revision trees.
- `[ ]` **Native binding and composition.** Close the gap with Mithril and fastn without adding a library:
  - a `data-bind` convention that wires elements to a `Store`, so components stop updating the DOM by hand;
  - attribute/property reflection (`observedAttributes`) so components can be configured from markup and from code;
  - `<template>` and `<slot>`-style children, so a parent can pass content to a child.
- `[ ]` **Evaluate a real no-build mode (2.0 / breaking).** `1.0.0` shipped with Vite serving and bundling browser code and Node's built-in type stripping for unit tests and the CLI. Removing the bundler and transpiler altogether would mean:
  - a small dev server (`node:http`) that serves `.ts` files with types stripped (`module.stripTypeScriptTypes`), and a "build" that only copies files and strips types;
  - component markup and styles loaded natively instead of Vite's `?raw` imports (CSS module scripts, `fetch` for templates, `@scope` for style scoping);
  - Tailwind moved out of the starter into an extension, since it needs a compiler.

  Because this changes how every component is written, it would be a breaking change for a future major release.

## Completed for 1.0.0

- `[x]` Removed the stray `v1.0.1` tag and released `v1.0.0`.
- `[x]` Hardened `BaseComponent`: `init()` runs once, `connected()` handles re-subscriptions on reconnect, `delegate()` guards `event.target instanceof Element`, and lifecycle/delegation behaviour is covered by Playwright tests in `template/e2e/base-component.spec.js`.

## Releasing

Use Conventional Commit titles (`feat:`, `fix:`, `chore:`, etc.) on pull requests merged to `main`. The `release` job in `.github/workflows/ci.yml` runs Release Please to keep a release pull request open; merging it bumps versions, updates `CHANGELOG.md`, tags the release, and creates the GitHub Release.
