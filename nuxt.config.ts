import svgLoader from 'vite-svg-loader'

import { AVAILABLE_LOCALES, DEFAULT_LOCALE } from './i18n/config'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/image-edge', '@nuxtjs/i18n', '@oku-ui/motion-nuxt'],
  devtools: {
    enabled: false,
  },

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
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Figtree:wght@100;200;300;400;500;600;700;800;900',
        },
      ],
      noscript: [{ children: 'Javascript is required' }],
    },
    pageTransition: { name: 'page', mode: 'out-in' },
  },

  typescript: {
    shim: false,
  },

  css: ['~/assets/css/main.css'],
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

  hooks: {
    'webpack:config': (configs) => {
      configs.forEach((config) => {
        const svgRule = config.module.rules.find(
          (rule: { test: { test: (arg0: string) => any } }) => rule.test.test('.svg')
        )
        svgRule.test = /\.(png|jpe?g|gif|webp)$/
        config.module.rules.push({
          test: /\.svg$/,
          oneOf: [
            {
              resourceQuery: /inline/,
              loader: 'file-loader',
              query: {
                name: 'static/image/[name].[hash:8].[ext]',
              },
            },
            {
              loader: 'vue-svg-loader',
              options: {
                // Optional svgo options
                svgo: {
                  plugins: [{ removeViewBox: false }],
                },
              },
            },
          ],
        })
      })
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
    baseUrl: process.env.DOMAIN_URL,
  },

  vite: {
    vue: {
      script: {
        defineModel: true,
      },
    },
    plugins: [
      svgLoader({
        /* NOTE: add here optional config */
      }),
    ],
  },

  telemetry: false,
})
