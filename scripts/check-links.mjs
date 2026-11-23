// 実績（src/content/works）とギャラリー（src/data/gallery.ts）の外部リンクが生きているか確認する
// 使い方: pnpm check:links
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const targets = [];

const worksDir = path.join(root, 'src/content/works');
for (const file of fs.readdirSync(worksDir).filter((f) => f.endsWith('.mdx'))) {
  const src = fs.readFileSync(path.join(worksDir, file), 'utf8');
  const url = src.match(/^url:\s*"([^"]+)"/m)?.[1];
  const title = src.match(/^title:\s*"([^"]+)"/m)?.[1];
  const draft = /^draft:\s*true/m.test(src);
  if (url) targets.push({ where: `works/${file}${draft ? ' (draft)' : ''}`, title, url });
}

const gallery = fs.readFileSync(path.join(root, 'src/data/gallery.ts'), 'utf8');
for (const m of gallery.matchAll(/title: "([^"]+)", url: "([^"]+)"/g)) {
  targets.push({ where: 'gallery', title: m[1], url: m[2] });
}

const UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36';

async function check({ url }) {
  try {
    const res = await fetch(url, {
      redirect: 'follow',
      headers: { 'user-agent': UA, 'accept-language': 'ja' },
      signal: AbortSignal.timeout(15000),
    });
    const moved = new URL(res.url).hostname !== new URL(url).hostname ? ` → ${res.url}` : '';
    return { ok: res.ok, label: `${res.status}${moved}` };
  } catch (e) {
    return { ok: false, label: `ERROR ${e.cause?.code ?? e.name}` };
  }
}

const results = await Promise.all(targets.map(async (t) => ({ ...t, ...(await check(t)) })));
for (const r of results.sort((a, b) => Number(a.ok) - Number(b.ok))) {
  console.log(`${r.ok ? 'OK ' : 'NG '} ${r.label.padEnd(10)} ${r.where.padEnd(24)} ${r.title}  ${r.url}`);
}
console.log(`\nNG: ${results.filter((r) => !r.ok).length} / ${results.length}`);
