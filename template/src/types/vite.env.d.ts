declare module '*.html?inline' {
  const content: string;
  export default content;
}

declare module '*.css?inline' {
  const content: string;
  export default content;
}

declare module '*.html' {
  const content: string;
  export default content;
}

declare module '../components' {
  export const COMPONENT_PATHS: Record<
    string,
    () => Promise<{ default: typeof HTMLElement }>
  >;
}

// For vite-plugin-component-manifest production paths
declare module '/ts-wc-templater/assets/*.js' {
  // Using typeof HTMLElement as a more robust type for custom element constructors
  // in a .d.ts context, instead of CustomElementConstructor which might not always be resolved.
  const component: () => Promise<{ default: typeof HTMLElement }>;
  export default component;
}

// Fallback for any other .js files that might be dynamically imported this way.
// Using 'any' here as the shape of miscellaneous JS files is unknown.
declare module '*.js' {
  const value: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  export default value;
}
