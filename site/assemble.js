// Builds the source of the Boba website in .site/: a copy of the app
// template with the site's own pages (site/overlay/) laid over it.
import fs from 'node:fs';
import path from 'node:path';
import { addRoute } from '../template/scripts/boba.ts';

const root = path.join(import.meta.dirname, '..');
const out = path.join(root, '.site');
const SKIP = [
  'node_modules',
  'dist',
  'dist-subpath',
  'playwright-report',
  'test-results',
];

fs.rmSync(out, { recursive: true, force: true });
fs.cpSync(path.join(root, 'template'), out, {
  recursive: true,
  filter: (source) => !SKIP.includes(path.basename(source)),
});
fs.cpSync(path.join(root, 'site', 'overlay'), out, { recursive: true });

// The site's extra pages get their routes the way any app would add them.
addRoute(out, '/docs', 'docs-page');
addRoute(out, '/about', 'about-page');

// On GitHub Actions, record which commit and run this build came from; the
// home page shows it. Local builds have no such record and show nothing.
const { GITHUB_SHA, GITHUB_SERVER_URL, GITHUB_REPOSITORY, GITHUB_RUN_ID } =
  process.env;
if (GITHUB_SHA) {
  const repo = `${GITHUB_SERVER_URL}/${GITHUB_REPOSITORY}`;
  fs.writeFileSync(
    path.join(out, 'public', 'data', 'build.json'),
    JSON.stringify({
      commit: GITHUB_SHA,
      commitUrl: `${repo}/commit/${GITHUB_SHA}`,
      runUrl: `${repo}/actions/runs/${GITHUB_RUN_ID}`,
      builtAt: new Date().toISOString(),
    })
  );
}

console.log(`Assembled the site in ${path.relative(process.cwd(), out)}`);
