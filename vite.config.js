import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://your-backend-service.onrender.com', // Replace with your Render backend URL
        changeOrigin: true,
      },
    },
  },
});
