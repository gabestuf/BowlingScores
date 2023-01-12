import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const localAPI = "http://localhost:3000/"
const vercelAPI = "https://bowling-scores-api.vercel.app/"


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/user/getMatches": vercelAPI,
      "/user/saveScore": vercelAPI,
      "/user/signin":vercelAPI,
      "/user/signup":vercelAPI,
    }
  }
});