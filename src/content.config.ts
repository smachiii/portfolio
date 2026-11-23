import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * 実績（旧 pages/case01.vue〜case12.vue）
 * 1件 = src/content/works/<id>.mdx。URL は /works/<id>
 */
const works = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/works' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      url: z.string().url(),
      tools: z.array(z.string()),
      /** 一覧での並び順（大きいほど先頭） */
      order: z.number(),
      thumbnail: image(),
      pc: z.array(image()),
      sp: z.array(image()),
      /** true にすると一覧・詳細ページに出さない */
      draft: z.boolean().default(false),
    }),
});

export const collections = { works };
