# TODO: Road to 1.0.0

What must be true before tagging `v1.0.0`. The supported install path is `npx github:sholtomaud/boba <app>`; publishing to npm is not planned, so a release is a git tag plus a GitHub Release (created by `release.yml`).

## Blockers

- `[ ]` **Delete the stray `v1.0.1` tag.** It exists on GitHub with no release behind it, and would sit above `v1.0.0` in version order. Remove it before tagging the release.
- `[ ]` **Decide what a new app starts with.** The template is also Boba's own site, so new apps begin with Boba's marketing pages (home, docs, about) and links to this repository. Either accept that as the starter, or keep the showcase pages out of what gets scaffolded.

## Should fix

- `[ ]` **CHANGELOG and stability statement.** Core files are copied into each app, so apps cannot pull later fixes. Say so, state what counts as the stable API (`BaseComponent`, `Router`, `Store`, the `boba` CLI commands), and start a `CHANGELOG.md`.
- `[ ]` **Tighten the Content Security Policy.** `script-src` allows `'unsafe-inline'`, partly for the inline base-URL script in `index.html`. Use a hash, or move the script to a file.
- `[ ]` **Make the `html` helper safe or remove it.** It does not escape interpolated values and no component uses it.
- `[ ]` **Test more than Chromium on Linux.** Add Firefox and WebKit Playwright projects, and run the unit tests and scaffolder on Windows and macOS.
- `[ ]` **Fix base-URL detection for `user.github.io` root sites.** The hostname heuristic in `index.html` treats the first path segment of a deep link as a repository name.

## Nice to have

- `[ ]` **Harden `BaseComponent`.** It has no unit tests, and re-attaching an element runs `init()` again, which duplicates listeners added with `delegate()`.
- `[ ]` **Retire or update `docs/`.** The two dated review documents describe the layout before `template/` became the single source.

## Releasing

Once the blockers are closed: set the version in `package.json` and `template/package.json`, update the changelog, merge to `main`, then tag `v1.0.0`. The tag triggers `release.yml`, which runs the tests and creates the GitHub Release.
