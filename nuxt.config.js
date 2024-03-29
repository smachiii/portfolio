import Sass from 'sass'
// import Fiber from 'fibers';

export default {
  ssr: false,
  target: 'static',
  head: {
    title: 'portfolio',
    htmlAttrs: {
      lang: 'ja',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    script: [],
    link: [
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400&family=Quicksand:wght@400;500&family=Roboto&display=swap',
      },
      {
        rel: 'stylesheet',
        href: 'https://use.fontawesome.com/releases/v5.6.1/css/all.css',
      },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ],
  },
  loading: { color: '#fff' },
  css: ['@/assets/css/reset.css'],
  plugins: [{ src: '@/plugins/common.js', mode: 'client' }],
  components: true,
  modules: [
    '@nuxtjs/style-resources',
    '@nuxtjs/axios',
    '@nuxtjs/eslint-module',
    ['@nuxtjs/google-gtag'],
  ],
  'google-gtag': {
    id: 'G-WJ6W8LFK7H',
    debug: false,
  },
  styleResources: {
    scss: ['@/assets/scss/common.scss', '@/assets/scss/config.scss'],
  },
  axios: {
    baseURL:
      process.env.NODE_ENV === 'production'
        ? 'https://s-machino.netlify.app/'
        : 'http://localhost:5555/',
  },
  build: {
    loaders: {
      scss: {
        implementation: Sass,
        sassOptions: {
          // fiber: Fiber,
        },
      },
    },
  },
}
