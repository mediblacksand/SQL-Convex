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
    host: '0.0.0.0', // Listen on all network interfaces (required for Docker)
    port: 5173,      // Explicit port configuration
    fs: {
      allow: ['..']
    }
  }
})