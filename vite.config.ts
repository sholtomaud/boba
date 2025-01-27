import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    build: {
        target: 'esnext',
        outDir: 'dist',
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html')
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
    },
    assetsInclude: ['**/*.html',],
    plugins: []
});