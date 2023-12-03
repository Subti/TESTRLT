// Use default configuration for Vite
import { defineConfig } from 'vite';

// Then add settings for Vite server to proxy api requests to the Express server
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // Your Express server URL
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
