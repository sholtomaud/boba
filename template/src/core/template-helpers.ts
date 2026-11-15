function join(strings: TemplateStringsArray, values: unknown[]): string {
  return strings.reduce((result, string, i) => {
    const value = values[i];
    return (
      result + string + (Array.isArray(value) ? value.join('') : (value ?? ''))
    );
  }, '');
}

/**
 * Tags a template literal as HTML so editors can highlight it. Returns the
 * plain string: arrays are joined, `null`/`undefined` render as nothing.
 * Values are not escaped, so never interpolate untrusted text — set it with
 * `textContent` instead.
 */
export function html(strings: TemplateStringsArray, ...values: unknown[]) {
  return join(strings, values);
}

/** Tags a template literal as CSS so editors can highlight it. */
export function css(strings: TemplateStringsArray, ...values: unknown[]) {
  return join(strings, values);
}
