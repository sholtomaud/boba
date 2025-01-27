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