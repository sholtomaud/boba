import { test, describe } from 'node:test';
import assert from 'node:assert';
import { html, css } from './template-helpers.ts';

describe('Template Helpers', () => {
  test('html tagged template should return the correctly concatenated string', () => {
    const result = html`<div>${'content'}</div>`;
    assert.strictEqual(result, '<div>content</div>');
  });

  test('html joins arrays and skips null and undefined', () => {
    // Reformatting would change the template strings under test.
    // prettier-ignore
    const items = ['a', 'b'].map((item) => html`<li>${item}</li>`);
    // prettier-ignore
    const result = html`<ul>${items}</ul>${null}${undefined}${0}`;
    assert.strictEqual(result, '<ul><li>a</li><li>b</li></ul>0');
  });

  test('css tagged template should return the correctly concatenated string', () => {
    // Reformatting would change the template string under test.
    // prettier-ignore
    const result = css`.class { color: ${'red'}; }`;
    assert.strictEqual(result, '.class { color: red; }');
  });
});
