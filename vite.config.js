import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import staticSeoPages from './scripts/staticSeoPages.mjs';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    staticSeoPages()
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/lucide-react')) {
            return 'vendor-icons';
          }
        }
      }
    }
  },
  server: {
    port: 3000,
    open: true
  }
});