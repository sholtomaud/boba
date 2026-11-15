# TODO: Road to 1.0.0

What must be true before tagging `v1.0.0`. The supported install path is `npx github:sholtomaud/boba <app>`; publishing to npm is not planned, so a release is a git tag plus a GitHub Release (created by `release.yml`).

## Blockers

- `[ ]` **Delete the stray `v1.0.1` tag.** It exists on GitHub with no release behind it, and would sit above `v1.0.0` in version order. Remove it before tagging the release.

- `[ ]` **Decide whether a real no-build mode lands before 1.0.** "Zero-build" was the headline and is not true today: the browser code goes through Vite. The site and README now say what is true instead. Making the original claim true means no bundler and no transpiler, with Node's built-in type stripping as the only transform:
  - a small dev server (`node:http`) that serves `.ts` files with types stripped (`module.stripTypeScriptTypes`), and a "build" that only copies files and strips types;
  - component markup and styles loaded natively instead of Vite's `?raw` imports (CSS module scripts, `fetch` for templates, `@scope` for style scoping);
  - Tailwind out of the starter (see Roadmap), since it needs a compiler.

  This changes how every component is written, so it is a breaking change if it comes after 1.0. Recommendation: do it before tagging.

## Nice to have

- `[ ]` **Harden `BaseComponent`.** It has no unit tests, and re-attaching an element runs `init()` again, which duplicates listeners added with `delegate()`.
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

## Releasing

Once the blockers are closed: set the version in `package.json` and `template/package.json`, update the changelog, merge to `main`, then tag `v1.0.0`. The tag triggers `release.yml`, which runs the tests and creates the GitHub Release.
