import type { StrapiMedia } from './common'

export type Partner =
  | {
      id: string
      attributes: {
        createdAt: string
        link?: string
        name?: string
        logo: StrapiMedia
      }
    }
  | undefined
  | null
