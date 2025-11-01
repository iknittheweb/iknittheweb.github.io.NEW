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
  },
});
