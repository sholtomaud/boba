import { defineConfig } from 'vite';
import { resolve } from 'path';
import componentManifest from './vite-plugin-component-manifest';

export default defineConfig(({ mode }) => ({
    base: mode === 'production' ? '/ts-wc-templater/' : '/',
    plugins: [componentManifest()],
    build: {
        outDir: 'dist',
        assetsDir: 'assets',
        emptyOutDir: true,
        target: 'esnext',
        modulePreload: false, // Add this
        rollupOptions: {
            input: {
                main: './index.html'
            },
            output: {
                entryFileNames: 'assets/[name].js',
                chunkFileNames: 'assets/[name].js',
                assetFileNames: 'assets/[name][extname]'
            }
        }
    },
    server: {
        port: 3000,
        strictPort: true,
        open: true
    },
    preview: {
        port: 4000,
        strictPort: true,
        open: true
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, './src')
        }
    }
}));