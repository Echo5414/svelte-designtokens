import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [sveltekit()],
  css: {
    postcss: './postcss.config.cjs'
  },
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}']
  }
});
