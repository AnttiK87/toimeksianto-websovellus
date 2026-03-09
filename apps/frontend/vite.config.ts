import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  root: path.resolve(__dirname), // frontendin juurihakemisto
  plugins: [react()],
  build: {
    outDir: path.resolve(__dirname, 'dist'), // tämä luo dist kansioon frontendin juureen
    emptyOutDir: true, // tyhjentää dist kansion ennen buildia
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
});
