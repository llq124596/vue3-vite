import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  // base: '/test/',
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, 'src'),
      "comps": path.resolve(__dirname, 'src/components')
    }
  },
  server: {
    port: 4000,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  }
})
