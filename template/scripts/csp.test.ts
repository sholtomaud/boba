import { test } from 'node:test';
import assert from 'node:assert';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

// index.html allows its inline script by hash rather than 'unsafe-inline'.
// Editing the script changes the hash; this says what to update it to.
test('the Content-Security-Policy allows the inline script in index.html', () => {
  // Browsers hash the script with its line endings normalized to LF.
  const html = fs
    .readFileSync(path.join(import.meta.dirname, '..', 'index.html'), 'utf8')
    .replaceAll('\r\n', '\n');
  const csp = html.match(/Content-Security-Policy"\s+content="([^"]+)"/)?.[1];
  assert.ok(csp, 'index.html has no Content-Security-Policy');
  assert.doesNotMatch(csp.match(/script-src[^;]*/)![0], /unsafe-inline/);

  for (const [, script] of html.matchAll(/<script>([\s\S]*?)<\/script>/g)) {
    const hash = crypto.createHash('sha256').update(script).digest('base64');
    assert.ok(
      csp.includes(`'sha256-${hash}'`),
      `Update script-src in index.html to include 'sha256-${hash}'`
    );
  }
});
