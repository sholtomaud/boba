# TODO: Road to 1.0.0

What must be true before tagging `v1.0.0`. The supported install path is `npx github:sholtomaud/boba <app>`; publishing to npm is not planned, so a release is a git tag plus a GitHub Release (created by `release.yml`).

## Blockers

- `[ ]` **Delete the stray `v1.0.1` tag.** It exists on GitHub with no release behind it, and would sit above `v1.0.0` in version order. Remove it before tagging the release.

## Nice to have

- `[ ]` **Harden `BaseComponent`.** It has no unit tests, and re-attaching an element runs `init()` again, which duplicates listeners added with `delegate()`.
- `[ ]` **Retire or update `docs/`.** The two dated review documents describe an earlier layout of the repository.

## Releasing

Once the blockers are closed: set the version in `package.json` and `template/package.json`, update the changelog, merge to `main`, then tag `v1.0.0`. The tag triggers `release.yml`, which runs the tests and creates the GitHub Release.
