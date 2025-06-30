import { defineConfig } from 'vite';
import { resolve } from 'path';
import componentManifest from './vite-plugin-component-manifest';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/ts-wc-templates/' : '/',
  plugins: [
    tailwindcss(), // Add the Tailwind CSS plugin
    componentManifest()
  ],
  // The postcss.config.js and explicit css.postcss config are no longer needed
  // when using @tailwindcss/vite
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    target: 'esnext',
    modulePreload: false,
    rollupOptions: {
      input: {
        main: './index.html',
      },
      output: {
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash][extname]',
      },
    },
  },
  server: {
    port: 3000,
    strictPort: true,
    open: true,
  },
  preview: {
    port: 4000,
    strictPort: true,
    open: true,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
}));
