# Portfolio (Astro)

Satomi Machino のポートフォリオサイト。Astro + Tailwind CSS v4 で静的出力し、Netlify に配信している（`main` への push で自動デプロイ、設定は `netlify.toml`）。将来は Cloudflare Workers（Static Assets）に移行予定で、`wrangler.jsonc` はそのためのもの。

## コマンド（パッケージマネージャーは pnpm）
- `pnpm dev` … 開発サーバー
- `pnpm build` … 型チェック（astro check）+ ビルド
- `pnpm preview` … ビルドして wrangler でローカル確認（Cloudflare 移行後向け。今は `pnpm astro preview` でも可）
- `pnpm run deploy` … Cloudflare にデプロイ（移行後に使う。今は使わない）
- `pnpm format` … Prettier（Tailwind のクラス順も整列）

## 環境の前提
- Node.js 24 / pnpm。依存のビルド許可は `pnpm-workspace.yaml` の `allowBuilds`（`package.json` の `"pnpm"` フィールドは使わない）。
- TypeScript は 6 系に固定（`astro check` が 7 未対応）。依存を更新するときも typescript は上げない。
- Astro は 7 系。API を使うときは公式ドキュメントで現行の書き方を確認する。

## ルール
- ページ・レイアウトは `.astro` で書く。React（`.tsx`）は状態や操作が必要な部品だけに使い、`client:visible` など最小の client ディレクティブで読み込む。
- スタイルは Tailwind のユーティリティで書く。色・フォント・余白・角丸・影は `src/styles/global.css` の `@theme` に定義したトークンを使い、任意値（`text-[13px]`、`bg-[#fff]` など）は使わない。必要なら先に `@theme` にトークンを追加する。
- 行間は2種類だけ: 見出し・ラベル・タグ・短い1行テキストは `leading-heading`（h1〜h4 は既定で適用）、文章は `leading-body`（body の既定なので指定不要）。`leading-snug` / `leading-loose` などは使わない。タグの高さは行間ではなく `py-*` で調整する。
- 画像は `src/assets/` に置く（`public/` に置かない）。旧サイトから移した低解像度の画像は、再圧縮で劣化しないよう `OriginalImage`（元ファイルをそのまま配信）で表示する。新しく高解像度の画像を追加・差し替えたときは `astro:assets` の `<Image />` を使ってよい。
- 実績の追加は `src/content/works/<id>.mdx` を作るだけ。frontmatter のスキーマは `src/content.config.ts`。
- ギャラリーの追加は `src/data/gallery.ts` に1行追加し、画像を `src/assets/images/gallery/` に置く。
- 共通パーツ: `PageTitle`（h1）、`Panel`（すりガラスのコンテンツ枠）、`SectionTitle`（h2）。
- 変更後は `pnpm build` が通ることを確認する。
