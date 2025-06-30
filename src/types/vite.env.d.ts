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
  export const COMPONENT_PATHS: Record<string, () => Promise<any>>;
}

// For vite-plugin-component-manifest production paths
declare module '/ts-wc-templater/assets/*.js' {
  const component: () => Promise<{ default: CustomElementConstructor }>;
  export default component;
}

// Fallback for any other .js files that might be dynamically imported this way
// if the above is too specific due to hashing or base path changes.
// Consider if this is too broad or if the specific one is enough.
declare module '*.js' {
  const value: any;
  export default value;
}
