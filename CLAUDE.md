# Portfolio (Astro)

Satomi Machino のポートフォリオサイト。Astro + Tailwind CSS v4 で静的出力し、Cloudflare Workers（Static Assets）に配信する。

## コマンド（パッケージマネージャーは pnpm）
- `pnpm dev` … 開発サーバー
- `pnpm build` … 型チェック（astro check）+ ビルド
- `pnpm preview` … ビルドして wrangler でローカル確認
- `pnpm run deploy` … Cloudflare にデプロイ
- `pnpm format` … Prettier（Tailwind のクラス順も整列）

## 環境の前提
- Node.js 24 / pnpm。依存のビルド許可は `pnpm-workspace.yaml` の `allowBuilds`（`package.json` の `"pnpm"` フィールドは使わない）。
- TypeScript は 6 系に固定（`astro check` が 7 未対応）。依存を更新するときも typescript は上げない。
- Astro は 7 系。API を使うときは公式ドキュメントで現行の書き方を確認する。

## ルール
- ページ・レイアウトは `.astro` で書く。React（`.tsx`）は状態や操作が必要な部品だけに使い、`client:visible` など最小の client ディレクティブで読み込む。
- スタイルは Tailwind のユーティリティで書く。色・フォント・余白・角丸・影は `src/styles/global.css` の `@theme` に定義したトークンを使い、任意値（`text-[13px]`、`bg-[#fff]` など）は使わない。必要なら先に `@theme` にトークンを追加する。
- 画像は `src/assets/` に置き、`astro:assets` の `<Image />` で表示する（`public/` に置かない）。
- 実績の追加は `src/content/works/<id>.mdx` を作るだけ。frontmatter のスキーマは `src/content.config.ts`。
- ギャラリーの追加は `src/data/gallery.ts` に1行追加し、画像を `src/assets/images/gallery/` に置く。
- 共通パーツ: `PageTitle`（h1）、`Panel`（すりガラスのコンテンツ枠）、`SectionTitle`（h2）。
- 変更後は `pnpm build` が通ることを確認する。
