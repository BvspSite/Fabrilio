import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/Fabrilio/', // Tambahkan ini sesuai dengan nama repository
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
