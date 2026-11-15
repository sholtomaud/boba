# TODO: Road to 1.0.0

What must be true before tagging `v1.0.0`. The supported install path is `npx github:sholtomaud/boba <app>`; publishing to npm is not planned, so a release is a git tag plus a GitHub Release (created by `release.yml`).

## Blockers

- `[ ]` **Add a `LICENSE` file.** The README says MIT, but without the file the code is not licensed.
- `[ ]` **Ship a `.gitignore` in scaffolded apps.** npm leaves `template/.gitignore` out when it packs the repo (`npm pack --dry-run` confirms), so an app created with `npx` has none and would commit `node_modules`. Store it under another name (e.g. `template/gitignore`) and have `bin/create-boba-app.js` write it as `.gitignore`; cover it in `test/cli.test.ts` against a packed tarball.
- `[ ]` **Make the version consistent.**
  - A `v1.0.1` tag already exists with no release; delete it before tagging `v1.0.0`.
  - `patching.yml` bumps the `package.json` patch version every week, so the version drifts from any release. Stop bumping there and set the version only when releasing.
  - `v1.0.0` is hard-coded in `nav-page.html`, `home-page.html` and the MCP server info in `scripts/boba.ts`. Derive it from `package.json` or remove it.
- `[ ]` **Decide what a new app starts with.** The template is also Boba's own site, so new apps begin with Boba's marketing pages, links to this repository and a static "CI / Build: Passing" badge. Either accept that as the starter (and remove the fake badge), or keep the showcase pages out of what gets scaffolded.
- `[ ]` **Verify the install path end to end.** In CI, pack the repo, scaffold an app from the tarball, then install, build and test it — today only the unpacked template is tested.

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
