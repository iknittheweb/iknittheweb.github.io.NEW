// Minimal Vite config to treat 'body-scroll-lock' as external/global
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      external: ['body-scroll-lock'],
      output: {
        globals: {
          'body-scroll-lock': 'bodyScrollLock',
        },
      },
    },
    minify: 'esbuild',
    sourcemap: false,
    assetsInlineLimit: 0,
    manifest: true,
    cssCodeSplit: true,
    outDir: 'dist',
    emptyOutDir: true,
    // Enable filename hashing for cache busting
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash][extname]',
      },
    },
  },
  base: '/',
});
