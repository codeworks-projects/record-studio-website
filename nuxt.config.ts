import svgLoader from 'vite-svg-loader'

import { AVAILABLE_LOCALES, DEFAULT_LOCALE } from './i18n/config'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/apollo',
    '@nuxt/image-edge',
    '@nuxtjs/i18n',
    '@vueuse/nuxt',
    '@formkit/auto-animate/nuxt',
    '@nuxt/image',
    '@oku-ui/motion-nuxt',
  ],
  // devtools: {
  //   enabled: true,
  // },
  app: {
    head: {
      meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com',
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: '',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap',
        },
      ],
      noscript: [{ children: 'Javascript is required' }],
    },
    pageTransition: { name: 'page', mode: 'out-in' },
  },

  gsap: {
    extraPlugins: {
      scrollTrigger: true,
      scrollTo: true,
    },
  },

  typescript: {
    shim: false,
  },

  css: ['~/assets/css/main.css', '~/assets/css/thicccboi.css'],
  postcss: {
    plugins: {
      'tailwindcss/nesting': {},
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  components: [
    {
      path: '~/components/',
      pathPrefix: false,
    },
  ],

  // apollo: {
  //   clients: {
  //     default: {
  //       httpEndpoint: process.env.NUXT_PUBLIC_GRAPHQL_HTTP_ENDPOINT || '',
  //       browserHttpEndpoint:
  //         process.env.NUXT_PUBLIC_IS_DEV == 'true'
  //           ? '/api'
  //           : process.env.NUXT_PUBLIC_GRAPHQL_BROWSER_HTTP_ENDPOINT,
  //       httpLinkOptions: {
  //         fetchOptions: {
  //           mode: 'cors', //Cors Needed for external Cross origins, need to allow headers from server
  //         },
  //         credentials: 'include', //must be omit to support application/json content type
  //       },
  //     },
  //   },
  // },

  runtimeConfig: {
    public: {
      strapiUrl: '',
      strapiImagePath: '',
    },
  },

  i18n: {
    locales: AVAILABLE_LOCALES.map((locale) => ({
      code: locale.code,
      file: locale.code + '.json',
      iso: locale.iso,
    })),

    lazy: true,
    langDir: 'locales',
    defaultLocale: DEFAULT_LOCALE,
    strategy: 'prefix_except_default',
    vueI18n: './i18n/define.config.ts',
  },

  nitro: {
    devProxy: {
      '/api': {
        target: process.env.NUXT_PUBLIC_GRAPHQL_BROWSER_HTTP_ENDPOINT,
        changeOrigin: true,
        ignorePath: true,
        cookieDomainRewrite: 'localhost', // Set the cookie domain to localhost
        followRedirects: true,
      },
    },
  },

  vite: {
    vue: {
      script: {
        defineModel: true,
      },
    },
    plugins: [svgLoader({ svgoConfig: { plugins: ['prefixIds'] } })],
  },

  build: {
    transpile: ['tslib'],
  },

  telemetry: false,
})
