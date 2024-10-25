import { defineNuxtPlugin } from '#app'

const DEFAULT_OPTIONS = {
  enabled: true,
  customResourceURL: 'https://connect.facebook.net/en_US/fbevents.js',
  customNoscriptURL: 'https://www.facebook.com/tr',
  pixelId: '',
}

export default defineNuxtPlugin((nuxtApp) => {
  const runtime = useRuntimeConfig()
  const options = {
    ...DEFAULT_OPTIONS,
    pixelId: runtime.public.facebookPixelId,
    enabled: false,
  }
  let isInitialized = false

  const fbq = (...args) => (fbq.callMethod ? fbq.callMethod(...args) : fbq.queue.push(args))

  const initialize = () => {
    if (isInitialized) return

    window._fbq = fbq
    window.fbq = fbq
    fbq.push = fbq
    fbq.loaded = true
    fbq.version = '2.0'
    fbq.queue = []

    fbq('init', options.pixelId)
    fbq('track', 'PageView')

    isInitialized = true
  }

  const loadScript = () => {
    if (document.querySelector(`script[src="${options.customResourceURL}"]`)) return

    const script = document.createElement('script')
    script.async = true
    script.src = options.customResourceURL
    document.head.appendChild(script)
  }

  if (process.client && options.enabled) {
    nuxtApp.hook('page:finish', () => {
      if (isInitialized) {
        fbq('track', 'PageView')
      }
    })
  }

  return {
    provide: {
      fbq: (eventName: string, params?: object) => {
        if (process.client && options.enabled && isInitialized) {
          fbq('track', eventName, params)
        }
      },
      fbqConsent: (type: 'grant' | 'revoke') => {
        if (process.client) {
          if (type === 'grant') {
            initialize()
            loadScript()
          } else {
            if (window.fbq) fbq('consent', 'revoke')
          }
        }
      },
    },
  }
})
