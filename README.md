# Satomi's Portfolio

Astro / Tailwind CSS v4 / MDX / Netlify（将来 Cloudflare Workers に移行予定）

## セットアップ

必要なもの: Node.js 24（`.node-version` 参照。mise / fnm なら自動で切り替わる）と pnpm（`corepack enable pnpm`）。

```sh
pnpm install
pnpm dev      # http://localhost:4321
pnpm build    # 型チェック + ビルド
```

### 環境まわりの注意

- **依存のビルドスクリプト**: pnpm は既定でブロックするので、`pnpm-workspace.yaml` の `allowBuilds` で esbuild・workerd・sharp を許可している。新しく `ERR_PNPM_IGNORED_BUILDS` が出たら `pnpm approve-builds` で追加する（`package.json` の `"pnpm"` フィールドは今の pnpm では読まれない）。
- **TypeScript は 6 系に固定**: `astro check` が TypeScript 7 に未対応のため。`package.json` は `^6` なので通常の `pnpm up` では上がらないが、`pnpm up --latest` を使うときは typescript を除外すること。7 対応は `@astrojs/ts-content-mapper`（実験的）が正式になってから検討する。

## 構成

```
src/
  assets/images/      画像（ビルド時に WebP 化・リサイズされる）
  components/         Header, Footer, Panel, PageTitle など
  content/works/      実績（1件 = 1 MDX）。draft: true で非公開
  data/gallery.ts     ギャラリー一覧
  layouts/            BaseLayout（head・ページ遷移・解析タグ）
  pages/              ルーティング（/works/[slug] は実績から自動生成）
  styles/global.css   Tailwind とデザイントークン（@theme）
public/_redirects     旧URL（/case02 など）→ 新URL（/works/case02）
netlify.toml          Netlify のビルド設定
wrangler.jsonc        Cloudflare の設定（移行時用）
```

## デプロイ（Netlify）

`main` に push すると Netlify が自動でビルド・公開する（設定は `netlify.toml`）。公開URL: https://s-machino.netlify.app/

- 旧 Nuxt 版のコードは `nuxt-legacy` ブランチと `v1-nuxt` タグに残してある
- `public/_redirects` は Netlify でもそのまま有効

### 将来 Cloudflare Workers に移すとき

独自ドメインを取るタイミングで移す想定。`wrangler.jsonc` は用意済み。

1. `astro.config.mjs` の `site` と `public/robots.txt` の Sitemap 行を新しいURLに変更
2. `pnpm wrangler login` → `pnpm run deploy`（`pnpm deploy` は pnpm 自体のコマンドと被るので `run` を付ける）
3. GitHub 連携するなら Cloudflare ダッシュボードの Workers & Pages → Create → Import a repository（ビルドコマンド `pnpm build`、デプロイコマンド `pnpm wrangler deploy`）
4. Netlify 側は消さずに、`_redirects` を `/* https://新URL/:splat 301!` だけにして転送する
5. お問い合わせフォームを Netlify Forms で作っていたら、送信先を差し替える

## 残タスク

- [ ] GitHub の main を新コードに置き換え（旧コードは nuxt-legacy / v1-nuxt に退避）
- [ ] 独自ドメインの取得 → Cloudflare へ移行（上の手順）
- [ ] Google Search Console に登録し、`sitemap-index.xml` を送信
- [ ] お問い合わせフォーム（Netlify の間は Netlify Forms が使える）。今は `/contact` のボタンを無効にしてある
- [ ] 必要に応じて ESLint（`eslint-plugin-astro`）を追加
