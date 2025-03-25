import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  base: '/', // Use '/' for Vercel or Render deployments
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: process.env.VITE_BACKEND_URL, // Ensure this matches your backend URL
        changeOrigin: true,
      },
    },
  },
});
