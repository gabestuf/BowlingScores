import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

let BUILD = true
const localAPI = "http://localhost:3000/"
const vercelAPI = "https://bowling-scores-api.vercel.app/"
let url = BUILD ? vercelAPI : localAPI


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/user/getMatches": url,
      "/user/saveScore": url,
      "/user/signin":url,
      "/user/signup":url,
    }
  }
});