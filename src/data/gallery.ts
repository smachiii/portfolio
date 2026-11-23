import type { ImageMetadata } from 'astro';

/** 制作実績ギャラリー（旧 pages/gallery.vue から移植）。上から順に表示される */
const items = [
  { title: "イートラスト株式会社", url: "https://hp-free.com/", date: "2020.08", category: "Webサービス・アプリ", file: "gallery_01.jpg" },
  { title: "株式会社NEXT STAGE", url: "https://next-stage.chiba.jp/", date: "2021.6", category: "求人・人材・転職", file: "gallery_03.jpg" },
  { title: "ミ・カーサ株式会社", url: "https://micasa-2020.jp/", date: "2020.08", category: "建築・建設・不動産", file: "gallery_04.jpg" },
  { title: "有限会社三恵ピーアール", url: "https://sankeipr.co.jp/", date: "2021.05", category: "物流・工場", file: "gallery_05.jpg" },
  { title: "トータルサポート株式会社", url: "http://hotelapps.tv/", date: "2020.06", category: "機械・電機・工業", file: "gallery_06.jpg" },
  { title: "しばしも接骨院", url: "https://shibashimo.com/", date: "2021.05", category: "病院・健康・薬", file: "gallery_11.jpg" },
  { title: "株式会社マルトモ商事", url: "https://fccoast.com/", date: "2021.09", category: "運動・スポーツ・ジム", file: "gallery_12.jpg" },
  { title: "新光マテリアル", url: "https://shinko-material.com/", date: "2020.04", category: "建築・建設・不動産", file: "gallery_13.jpg" },
  { title: "くにもと病院", url: "https://kunimoto-hp.medicru.net/lp/", date: "2021.04", category: "病院・健康・薬", file: "gallery_14.jpg" },
  { title: "株式会社井口石材", url: "https://iguchisekizai.co.jp/", date: "2020.08", category: "葬儀・お墓", file: "gallery_15.jpg" },
  { title: "有限会社イマフク", url: "https://imafuku.jp/", date: "2020.07", category: "病院・健康・薬", file: "gallery_17.jpg" },
  { title: "有限会社ステップファクトリー", url: "https://stepfactory.co.jp/", date: "2020.11", category: "ファッション・アパレル", file: "gallery_18.jpg" },
  { title: "鈴木(東)農園", url: "https://suzukihigashi-noen.jp/", date: "2020.10", category: "農業・自然・漁業", file: "gallery_22.jpg" },
  { title: "カットインムーヴ", url: "https://cut-in-move.com/", date: "2021.06", category: "美容室・サロン・エステ", file: "gallery_23.jpg" },
  { title: "深井電気株式会社", url: "https://fukaidk.co.jp/", date: "2021.03", category: "機械・電機・工業", file: "gallery_24.jpg" },
  { title: "小さな鉄板焼き 小高屋", url: "https://katatsumuri-k.jp/", date: "2020.08", category: "デザイン・アート・ものづくり", file: "gallery_25.jpg" },
  { title: "有限会社ジェイ・ピー・フィットネス", url: "https://jpf-stk.tokyo/", date: "2021.09", category: "運動・スポーツ・ジム", file: "gallery_27.jpg" },
  { title: "TRAM", url: "https://tram2014.com/", date: "2021.10", category: "美容室・サロン・エステ", file: "gallery_28.jpg" },
  { title: "日本フードプロフェッショナル株式会社", url: "https://grandpa.tokyo/", date: "2021.09", category: "飲食店・グルメ", file: "gallery_29.jpg" },
  { title: "岸理映子シェイプアップスタジオR", url: "https://studio-r.info/", date: "2021.07", category: "運動・スポーツ・ジム", file: "gallery_30.jpg" },
  { title: "エンラボ", url: "https://enn-lab.co.jp/lp/", date: "2021.09", category: "福祉・介護・支援　", file: "gallery_31.jpg" },
  { title: "豊和", url: "https://ho-wa.net/", date: "2021.09", category: "飲食店・グルメ", file: "gallery_32.jpg" },
  { title: "株式会社神楽坂パッケージ", url: "https://p-kagurazaka.co.jp/", date: "2021.07", category: "企画・制作・開発", file: "gallery_33.jpg" },
  { title: "医療法人社団日清会", url: "https://shimizu-cc.com/", date: "2021.06", category: "病院・健康・薬", file: "gallery_35.jpg" },
  { title: "医療法人社団央優会", url: "https://oyukai-lc.net/", date: "2021.08", category: "病院・健康・薬", file: "gallery_36.jpg" },
  { title: "白樺法律事務所", url: "https://shirakaba-lo.com/", date: "2021.06", category: "金融・保険・法律", file: "gallery_37.jpg" },
  { title: "株式会社サイラ", url: "https://saira-nls.com/", date: "2021.11", category: "美容・化粧品・ケア用品", file: "gallery_38.jpg" },
  { title: "栃木エリア巨樹の会", url: "https://tochigi-kyojunokai-lp.medicru.net/", date: "2020.08", category: "病院・健康・薬", file: "gallery_40.jpg" },
  { title: "NKワークス株式会社", url: "https://nk-works.co.jp/", date: "2020.12", category: "機械・電機・工業", file: "gallery_45.jpg" },
  { title: "さえだ歯科医院", url: "https://saeda-dental.com/", date: "2021.04", category: "病院・健康・薬", file: "gallery_47.jpg" },
  { title: "crescere", url: "https://restaurant-crescere.com/", date: "2021.11", category: "飲食店・グルメ", file: "gallery_49.jpg" },
  { title: "合同会社ECOlead", url: "https://ecolead1217.com/", date: "2021.12", category: "家電・生活用品", file: "gallery_52.jpg" },
  { title: "合同会社くすのき保育園", url: "https://kusunoki-h.tokyo/", date: "2021.11", category: "学校・教育・保育園・幼稚園", file: "gallery_53.jpg" },
  { title: "イートラスト株式会社", url: "https://apps.apple.com/jp/app/bxi-5g/id1530321262", date: "2020.9", category: "ロゴ制作", file: "gallery_55.jpg" },
  { title: "スマート設備", url: "http://lp.smart-setsubi.com/", date: "2021.12", category: "家電・生活用品", file: "gallery_56.jpg" },
  { title: "きんとき", url: "https://kintoki-an.com/", date: "2021.12", category: "飲食店・グルメ", file: "gallery_57.jpg" },
  { title: "DAHLIA", url: "https://dahlia801.com/", date: "2021.12", category: "飲食店・グルメ", file: "gallery_58.jpg" },
  { title: "株式会社空のはね", url: "https://soranohane.com/", date: "2022.3", category: "学校・教育・保育園・幼稚園", file: "gallery_59.jpg" },
  { title: "株式会社R / カラーズ", url: "https://colors-info.com/", date: "2022.4", category: "飲食店・グルメ", file: "gallery_60.jpg" },
  { title: "なかそねメディカルクリニック", url: "https://nakasone-clinic.jp/", date: "2022.9", category: "病院・健康・薬", file: "gallery_61.jpg" },
] as const;

const images = import.meta.glob<ImageMetadata>('/src/assets/images/gallery/*.jpg', {
  eager: true,
  import: 'default',
});

export const gallery = items.map(({ file, ...rest }) => {
  const image = images[`/src/assets/images/gallery/${file}`];
  if (!image) throw new Error(`Gallery image not found: ${file}`);
  return { ...rest, image };
});
