# Satomi's Portfolio

Astro / Tailwind CSS v4 / MDX / Cloudflare Workers (Static Assets)

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
wrangler.jsonc        Cloudflare の設定
```

## デプロイ（Cloudflare Workers）

1. `astro.config.mjs` の `site` を本番URLに変更
2. `pnpm wrangler login`
3. `pnpm run deploy`（`pnpm deploy` は pnpm 自体のコマンドと被るので `run` を付ける）

GitHub 連携で自動デプロイする場合は、Cloudflare ダッシュボードの Workers & Pages → Create → Import a repository から接続する（ビルドコマンド `pnpm build`、デプロイコマンド `pnpm wrangler deploy`）。

## 残タスク

- [ ] 最初のコミット & GitHub に push
- [ ] 独自ドメインの取得（Cloudflare Registrar）→ Worker に Custom Domain 追加 → `site` を本番URLに変更
- [ ] サイトマップ（`pnpm astro add sitemap`）→ Google Search Console に登録・送信
- [ ] お問い合わせフォームの送信先（Formspree など or Cloudflare アダプター + API ルート、スパム対策に Turnstile）。今は `/contact` のボタンを無効にしてある
- [ ] 旧 Netlify サイトから新URLへの転送（旧サイトは消さずに `_redirects` に `/* https://新URL/:splat 301!` だけ置く）
- [ ] 必要に応じて ESLint（`eslint-plugin-astro`）を追加
