// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // 本番URL。独自ドメインに移行したら変更する
  site: 'https://s-machino.netlify.app',
  integrations: [
    mdx(),
    react(),
    sitemap({
      // noindex のページはサイトマップに載せない
      filter: (page) => !/\/(contact|404)\/?$/.test(new URL(page).pathname),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
