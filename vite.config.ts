import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@/components': path.resolve(__dirname, './src/components'),
      '@/sections': path.resolve(__dirname, './src/sections'),
      '@/context': path.resolve(__dirname, './src/context'),
      '@/hooks': path.resolve(__dirname, './src/hooks'),
      '@/lib': path.resolve(__dirname, './src/lib'),
      '@/locales': path.resolve(__dirname, './src/locales'),
      '@/styles': path.resolve(__dirname, './src/styles'),
      '@/pages': path.resolve(__dirname, './src/pages'),
      '@/routes': path.resolve(__dirname, './src/routes'),
      '@/Routes': path.resolve(__dirname, './src/routes'),
      '@/data': path.resolve(__dirname, './src/data'),
      '@/types': path.resolve(__dirname, './src/types'),
      '@': path.resolve(__dirname, './src'),
      'next/link': path.resolve(__dirname, './src/components/ui/link.tsx'),
      'next/navigation': path.resolve(__dirname, './src/lib/navigation.ts'),
      'next-themes': path.resolve(__dirname, './src/context/theme-context.tsx'),
    },
  },
  define: {
    'process.env': {},
    global: 'window',
  },
  server: {
    port: 3000,
    allowedHosts: true,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    chunkSizeWarningLimit: 1600,
  },
});
