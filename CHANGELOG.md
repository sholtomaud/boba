# Changelog

Notable changes to Boba. Versions follow [Semantic Versioning](https://semver.org); what counts as the public API is described under [Stability and Upgrades](README.md#stability-and-upgrades).

## 1.0.0 (2026-11-21)

First stable release.

### The app you get

- A neutral starter: a home page, navigation, and two worked examples — a to-do list (`Store`, `<template>` rendering, delegated events) and a users page (service, API call, native form validation, route parameters).
- `BaseComponent`: light-DOM Custom Elements with `:host`-scoped styles, once-only `init()`, a `connected()` hook for re-subscribing on reconnect, and `delegate()` for event delegation.
- `Router`: History API routing with lazy-loaded components, `:param` segments, query strings, `beforeEnter` guards, a `navigate` event, a configurable not-found component, and handling of in-app link clicks. Works at a domain root, or under a sub-path when built with `--base`, including deep links.
- `Store`: `EventTarget`-based state.
- Installable and offline-capable without a plugin: web manifest, icons and a network-first service worker.
- A Content Security Policy that allows scripts only from the app's own origin.
- `npm run boba`: `generate component`, `generate service`, `add route`, `manifest`, and an MCP server.
- Unit tests with `node --test`; Playwright end-to-end tests against the dev server and the production build in Chromium, and against the production build in Firefox and WebKit.
- Type-checking with `tsc`, linting with oxlint, formatting with Prettier.

### Requirements

- Node.js 26 or higher.
