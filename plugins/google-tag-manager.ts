// plugins/gtm.client.ts
import { defineNuxtPlugin } from '#app'

const DEFAULT_OPTIONS = {
  enabled: true,
  id: '',
  defer: true,
  compatibility: false,
  nonce: undefined,
  customResourceURL: 'https://www.googletagmanager.com/gtm.js',
  customNoScriptURL: 'https://www.googletagmanager.com/ns.html',
}

export default defineNuxtPlugin((nuxtApp) => {
  const runtime = useRuntimeConfig()
  const options = {
    ...DEFAULT_OPTIONS,
    id: runtime.public.googleTagManagerId,
    enabled: false,
  }
  let isInitialized = false

  const initialize = () => {
    if (isInitialized) return

    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({
      'gtm.start': new Date().getTime(),
      event: 'gtm.js',
    })

    isInitialized = true
  }

  const loadScript = () => {
    if (document.querySelector(`script[src*="${options.customResourceURL}"]`)) return

    const script = document.createElement('script')
    script.async = options.defer !== true
    script.defer = options.defer === true

    const queryParams = `id=${options.id}`
    script.src = `${options.customResourceURL}?${queryParams}`

    document.head.appendChild(script)
  }

  return {
    provide: {
      gtm: (event: string, payload?: object) => {
        if (process.client && options.enabled && isInitialized) {
          window.dataLayer.push({ event, ...payload })
        }
      },
      gtmConsent: (type: 'grant' | 'revoke') => {
        if (process.client) {
          if (type === 'grant') {
            initialize()
            loadScript()
          } else {
            // Per revocare il consenso, possiamo rimuovere lo script e resettare dataLayer
            const script = document.querySelector(`script[src*="${options.customResourceURL}"]`)
            if (script) script.remove()
            window.dataLayer = []
            isInitialized = false
          }
        }
      },
    },
  }
})
