# Contributing to Boba

Thank you for contributing to Boba! The goal is simplicity and adherence to web standards — avoid adding heavy build tools or unnecessary third-party dependencies.

## Getting Started

Requirements: Node.js 26 or higher.

```bash
npm install
npx playwright install --with-deps
```

Make app changes in `template/` (the starter users get from `create-boba-app`), website-only page changes in `site/overlay/`, and scaffolder changes in `bin/` and `test/`.

## Checks Before Opening a Pull Request

All checks must pass before pushing:

```bash
npm run typecheck
npm run lint
npm test
npx playwright test
npm run site:check
```

## Pull Requests and Issues

- Use the repository's issue forms for bug reports and feature requests.
- Keep pull requests focused on one purpose and use Conventional Commit titles (`feat: …`, `fix: …`, `docs: …`, `ci: …`).
- Link issues with `Fixes #123` in the pull request description and note how the change was tested.
- See [AGENTS.md](AGENTS.md) for the full coding, testing, security, and attribution guidelines.
- Report security issues privately as described in [SECURITY.md](SECURITY.md).
