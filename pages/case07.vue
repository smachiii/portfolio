<template>
  <div>
    <h1>Case 07</h1>
    <div class="contents">
      <div class="case-datail">
        <b class="case-datail__name">エンラボ</b>
        <a href="https://enn-lab.co.jp/lp/" target="_blank" rel="noopener" class="case-datail__link"
          >https://enn-lab.co.jp/lp/</a
        >
        <p class="case-datail__tool">HTML / Scss / Javascript / PHP / Wordpress</p>
        <!-- <p class="case-datail__text">
          指定障害福祉サービス・自立訓練事業されているお客様のプロモーションサイト。<br />
          お客様のご要望により、HTMLベースで制作後、ワードプレスに組み込みました。<br />
          お問い合わせフォームは各事業所に送信できるようプラグインを拡張。
        </p> -->
      </div>
      <div class="img-container__pc">
        <div v-for="image in images" :key="image.index" class="img-wrap">
          <img :src="image.src" :alt="image.alt" />
        </div>
      </div>
      <div class="img-container__sp">
        <div v-for="image2 in images2" :key="image2.index" class="img-wrap">
          <img :src="image2.src" :alt="image2.alt" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      images: [
        {
          index: 1,
          src: require('@/assets/images/works/works_07-1_pc.jpg'),
          alt: 'エンラボPCメイン画像1',
        },
        {
          index: 2,
          src: require('@/assets/images/works/works_07-2_pc.jpg'),
          alt: 'エンラボPCメイン画像2',
        },
        {
          index: 3,
          src: require('@/assets/images/works/works_07-3_pc.jpg'),
          alt: 'エンラボPCメイン画像3',
        },
      ],
      images2: [
        {
          index: 1,
          src: require('@/assets/images/works/works_07-1_sp.png'),
          alt: 'エンラボSPメイン画像1',
        },
        {
          index: 2,
          src: require('@/assets/images/works/works_07-2_sp.png'),
          alt: 'エンラボSPメイン画像2',
        },
        {
          index: 3,
          src: require('@/assets/images/works/works_07-3_sp.png'),
          alt: 'エンラボSPメイン画像3',
        },
      ],
    }
  },
}
</script>
