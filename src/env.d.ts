/// <reference types="vite/client" />

declare module 'virtual:component-manifest' {
  export const COMPONENT_PATHS: Record<string, () => Promise<any>>;
}

// If you have other global type definitions or augmentations, they can go here.
// For example, if you import CSS modules:
// declare module '*.module.css' {
//   const classes: { readonly [key: string]: string };
//   export default classes;
// }
