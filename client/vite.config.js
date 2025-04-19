// client/vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  root: '.', // This should point to client root (default is fine)
  build: {
    outDir: 'dist'
  }
})
