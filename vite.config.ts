import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/SQL-Convex/', // Update this to match your GitHub repo name
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
  },
  optimizeDeps: {
    exclude: ['sql.js']
  },
  server: {
    host: '0.0.0.0',        // Listen on all network interfaces (required for Docker)
    port: 5173,             // Explicit port configuration
    strictPort: true,       // Don't try other ports if 5173 is busy
    hmr: {
      port: 5173,          // Hot module replacement port
    },
    fs: {
      allow: ['..']
    }
  }
})