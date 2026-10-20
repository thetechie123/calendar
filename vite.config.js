import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    visualizer({
      filename: './dist/stats.html',
      open: false,
      gzipSize: true,
      brotliSize: true
    })
  ],
  build: {
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/') || id.includes('node_modules/scheduler/')) {
            return 'vendor-react';
          }
          if (id.includes('node_modules/@supabase/')) {
            return 'vendor-supabase';
          }
          if (id.includes('node_modules/lucide-react/')) {
            return 'vendor-icons';
          }
          if (id.includes('node_modules/jspdf/') || id.includes('node_modules/jspdf-autotable/')) {
            return 'vendor-jspdf';
          }
          if (id.includes('node_modules/html2canvas/') || id.includes('node_modules/dompurify/')) {
            return 'vendor-html2canvas';
          }
          if (id.includes('node_modules/leaflet/')) {
            return 'vendor-maps';
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