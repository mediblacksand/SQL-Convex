import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' ? '/SQL-Convex/' : '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    rollupOptions: {
      external: [],
      output: {
        manualChunks: undefined,
        assetFileNames: (assetInfo) => {
          if (/\.(wasm)$/.test(assetInfo.name)) {
            return `assets/[name].[ext]`;
          }
          return `assets/[name]-[hash].[ext]`;
        },
      }
    }
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
    },
    // Remove CORS headers that block external script loading
    // headers: {
    //   'Cross-Origin-Embedder-Policy': 'require-corp',
    //   'Cross-Origin-Opener-Policy': 'same-origin',
    // }
  },
  // Add support for WASM files
  assetsInclude: ['**/*.wasm']
})