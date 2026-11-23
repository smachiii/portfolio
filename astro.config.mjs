// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // TODO: 本番のURL（独自ドメイン or *.workers.dev）に変更
  site: 'https://example.com',
  integrations: [mdx(), react()],
  vite: {
    plugins: [tailwindcss()],
  },
});
