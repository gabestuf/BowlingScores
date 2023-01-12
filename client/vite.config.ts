import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    manifest: true,
    rollupOptions: {
      input: "./src/main.tsx",
    },
  },
  server: {
    proxy: {
      "/user/getMatches": "http://localhost:3000/",
      "/user/saveScore": "http://localhost:3000/",
      "/user/signin":"http://localhost:3000/",
      "/user/signup":"http://localhost:3000/",
    }
  }
});