import MarkdownIt from 'markdown-it'

interface SymbolConfig {
   symbol: string
   wrapperTag?: string
   wrapperClass?: string
   single?: boolean
   href?: string
}

interface StateInline {
   pos: number
   posMax: number
   src: string
   push: (type: string, tag: string, nesting: number) => Token
}

interface Token {
   tag: string
   markup: string
   content?: string
   attrs?: [string, string][]
   nesting: number
   symbolConfig?: SymbolConfig
}

type RenderFunction = (
   tokens: Token[],
   idx: number,
   options: unknown,
   env: unknown,
   slf: unknown
) => string
type RuleFunction = (state: StateInline, silent: boolean) => boolean

const getTokenName = (wrapperClass?: string, wrapperTag?: string): string =>
   `custom_symbol_${wrapperClass || wrapperTag}`

const createToken = (
   state: StateInline,
   tokenName: string,
   wrapperTag: string,
   nesting: number,
   config: { symbol: string; wrapperClass?: string; content?: string; symbolConfig?: SymbolConfig }
): Token => {
   const token = state.push(tokenName, wrapperTag, nesting)
   token.markup = config.symbol

   if (config.content !== undefined) {
      token.content = config.content
   }

   if (config.symbolConfig) {
      token.symbolConfig = config.symbolConfig
   }

   if (config.wrapperClass) {
      token.attrs = [['class', config.wrapperClass]]
   }

   return token
}

const createCustomSymbolRule =
   (config: SymbolConfig): RuleFunction =>
   (state: StateInline, silent: boolean): boolean => {
      const {
         symbol,
         wrapperTag = 'span',
         wrapperClass = 'custom-highlight',
         single = false,
         href,
      } = config
      const { pos, posMax, src } = state

      if (pos + symbol.length > posMax || !src.startsWith(symbol, pos)) {
         return false
      }

      const tokenName = getTokenName(wrapperClass, wrapperTag)

      if (single) {
         if (silent) return true

         createToken(state, tokenName, wrapperTag, 0, { symbol, wrapperClass })
         state.pos = pos + symbol.length
         return true
      }

      if (pos + symbol.length * 2 > posMax) return false

      const closingIndex = src.indexOf(symbol, pos + symbol.length)
      if (closingIndex === -1) return false
      if (silent) return true

      const content = src.slice(pos + symbol.length, closingIndex)
      createToken(state, tokenName, wrapperTag, 1, {
         symbol,
         wrapperClass,
         content,
         symbolConfig: { symbol, wrapperTag, wrapperClass, href },
      })

      state.pos = closingIndex + symbol.length
      return true
   }

const createCustomSymbolRender =
   (md: MarkdownIt): RenderFunction =>
   (tokens: Token[], idx: number): string => {
      const token = tokens[idx]
      if (!token) return ''

      const classAttr = token.attrs?.[0]?.[1] ? ` class="${token.attrs[0][1]}"` : ''

      if (token.nesting === 0) {
         return `<${token.tag}${classAttr}>`
      }

      const hrefAttr =
         token.tag === 'a' && token.symbolConfig?.href ? ` href="${token.symbolConfig.href}"` : ''

      return `<${token.tag}${classAttr}${hrefAttr}>${md.utils.escapeHtml(token.content || '')}</${token.tag}>`
   }

const multiSymbolPlugin = (md: MarkdownIt, symbolConfigs: SymbolConfig[]): void => {
   const customSymbolRender = createCustomSymbolRender(md)

   symbolConfigs.forEach((config) => {
      const { wrapperTag = 'span', wrapperClass = 'custom-highlight' } = config
      const tokenName = getTokenName(wrapperClass, wrapperTag)
      const customSymbolRule = createCustomSymbolRule(config)

      md.inline.ruler.push(tokenName, customSymbolRule)
      md.renderer.rules[tokenName] = customSymbolRender
   })
}

export default defineNuxtPlugin(() => {
   const md = new MarkdownIt({
      html: true,
      breaks: true,
      linkify: true,
   })

   md.use(multiSymbolPlugin, [
      {
         symbol: '-hi-',
         wrapperTag: 'span',
         wrapperClass: '__text-highlighted',
      },
      {
         symbol: '-tos-',
         wrapperTag: 'a',
         href: '/tos',
      },
      {
         symbol: '-privacy-',
         wrapperTag: 'a',
         href: '/privacy',
      },
      {
         symbol: '-br-',
         wrapperTag: 'br',
         wrapperClass: '',
         single: true,
      },
   ])

   return {
      provide: {
         md: (text: any) =>
            text ? md.render(text).replace(/<p>/g, '').replace(/<\/p>/g, '') : text,
      },
   }
})
