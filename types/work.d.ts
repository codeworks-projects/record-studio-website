import type { StrapiMedia } from './common'

export type Work =
  | {
      id: string
      attributes: {
        createdAt: string
        agency?: string
        category?: 'spot' | 'advertising_campaign' | 'social_campaign'
        client?: string
        copy?: string
        location?: string
        previewVideo?: StrapiMedia
        dynamic?:
          | (
              | {
                  __component: 'work-dynamic.text'
                  textContent?: string
                }
              | {
                  __component: 'work-dynamic.video'
                  videoContent?: StrapiMedia
                }
              | {
                  __component: 'work-dynamic.image'
                  imageContent?: StrapiMedia
                }
            )[]
          | []
        title?: string
        type?:
          | 'product'
          | 'gdo'
          | 'design'
          | 'event'
          | 'corporate'
          | 'food'
          | 'timelapse'
          | 'hotellerie'
          | 'sport'
      }
    }
  | undefined
  | null
