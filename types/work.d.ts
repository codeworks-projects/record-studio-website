import type { StrapiMedia } from './common'

type ImageComponent = {
  __component: 'work-dynamic.image'
  imageContent?: StrapiMedia
}
type ImageGrid1x3Component = {
  __component: 'work-dynamic.image-grid1x3'
  imageGrid1x3_Row1Col1?: StrapiMedia
  imageGrid1x3_Row1Col2?: StrapiMedia
  imageGrid1x3_Row1Col3?: StrapiMedia
}
type ImageGrid2x1Component = {
  __component: 'work-dynamic.image-grid2x1'
  imageGrid2x1_Row1Col1?: StrapiMedia
  imageGrid2x1_Row2Col1?: StrapiMedia
}
type ImageGrid2x2Component = {
  __component: 'work-dynamic.image-grid2x2'
  imageGrid2x2_Row1Col1?: StrapiMedia
  imageGrid2x2_Row1Col2?: StrapiMedia
  imageGrid2x2_Row2Col1?: StrapiMedia
  imageGrid2x2_Row2Col2?: StrapiMedia
}
type TextComponent = {
  __component: 'work-dynamic.text'
  textContent?: string
}
type VideoComponent = {
  __component: 'work-dynamic.video'
  videoContent?: StrapiMedia
  videoUrl?: string
}
type VimeoComponent = {
  __component: 'work-dynamic.vimeo'
  vimeoID?: string
}
type YoutubeComponent = {
  __component: 'work-dynamic.youtube'
  youtubeID?: string
}

type DynamicComponent =
  | ImageComponent
  | ImageGrid1x3Component
  | ImageGrid2x1Component
  | ImageGrid2x2Component
  | TextComponent
  | VideoComponent
  | VimeoComponent
  | YoutubeComponent

type HeroVideo = {
  col_1: {
    data: {
      attributes: {
        url: string
      }
    }[]
  }
  col_2: {
    data: {
      attributes: {
        url: string
      }
    }[]
  }
  col_3: {
    data: {
      attributes: {
        url: string
      }
    }[]
  }
}

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
        link?: string
        dynamic?: DynamicComponent[] | []
        title?: string
        inEvidence?: boolean
        inEvidenceBig?: boolean
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
          | 'fashion'
          | 'automotive'
          | 'luxury'
        metaTitle?: string
        metaDescription?: string
      }
    }
  | undefined
  | null
