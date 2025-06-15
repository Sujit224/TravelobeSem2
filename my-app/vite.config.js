import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import rollupNodePolyFill from 'rollup-plugin-polyfill-node'

export default defineConfig({
  plugins: [react()],
  define: {
    global: 'globalThis', // ✅ Actual fix for runtime ReferenceError
  },
  resolve: {
    alias: {
      // optional: fallback polyfills
      process: 'rollup-plugin-polyfill-node/polyfills/process-es6',
      buffer: 'rollup-plugin-polyfill-node/polyfills/buffer-es6'
    },
  },
  optimizeDeps: {
    include: ['sockjs-client'],
  },
  build: {
    rollupOptions: {
      plugins: [rollupNodePolyFill()],
    },
  },
  server: {
    port: 3001,
  },

})
