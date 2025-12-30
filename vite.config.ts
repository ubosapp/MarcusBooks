
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import process from 'node:process';

export default defineConfig(({ mode }) => {
  // Fix: Explicitly import and use process from node:process to ensure types are correct in this environment
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    define: {
      // Permette al codice di usare process.env.API_KEY come richiesto
      'process.env.API_KEY': JSON.stringify(env.API_KEY || '')
    },
    server: {
      host: true
    },
    build: {
      outDir: 'dist',
      emptyOutDir: true
    }
  };
});
