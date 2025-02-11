import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import compression from 'vite-plugin-compression'; // Optional for gzip compression

export default defineConfig({
  plugins: [
    vue(),
    compression({ // Optional compression plugin
      algorithm: 'gzip',
      ext: '.gz',
    })
  ],
  build: {
    outDir: path.join(__dirname, "docs"),
    chunkSizeWarningLimit: 1000, // Adjust warning limit
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Split node_modules into individual vendor chunks
            const packageName = id.toString().split('node_modules/')[1].split('/')[0];
            // Group vue-related packages together
            if (packageName.startsWith('vue')) {
              return 'vue-vendor';
            }
            return packageName;
          }
        }
      }
    }
  }
});