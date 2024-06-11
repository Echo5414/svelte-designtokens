/* import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';


const config = {
  preprocess: vitePreprocess(),
  kit: {
    alias: {
      $lib: 'src/lib',
      $utils: 'src/utils',
      $stores: 'src/stores'
    },
    adapter: adapter()
  }
};

export default config; */

import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import postcssImport from 'postcss-import';
import postcssPresetEnv from 'postcss-preset-env';
import autoprefixer from 'autoprefixer';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: [
    vitePreprocess(),
    preprocess({
      scss: {
        includePaths: ['src']
      },
      postcss: {
        plugins: [
          postcssImport(),
          postcssPresetEnv({
            stage: 0,
            features: {
              'custom-media-queries': true
            }
          }),
          autoprefixer()
        ]
      }
    })
  ],
  kit: {
    alias: {
      $lib: 'src/lib',
      $utils: 'src/utils',
      $stores: 'src/stores'
    },
    adapter: adapter()
  }
};

export default config;
