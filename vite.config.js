import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Honour PORT when the harness assigns one, so two dev servers can run side
  // by side; falls back to Vite's default otherwise.
  server: process.env.PORT ? { port: Number(process.env.PORT) } : undefined,
  build: {
    target: 'es2020',
    // gsap + lenis split out so the motion layer caches separately from app code.
    rollupOptions: { output: { manualChunks: { motion: ['gsap', 'lenis'] } } },
  },
});
