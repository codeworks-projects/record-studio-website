<template>
  <div class="image-grid-2x2-dynamic">
    <Motion
      :initial="SLIDE_UP.INITIAL"
      :in-view="SLIDE_UP.IN_VIEW"
      :transition="{ ...TRANSITION.DEFAULT, delay: 0 }"
    >
      <Image
        class="image-grid-2x2-dynamic-image"
        :src="`${config.public.strapiImagePath}${imageGrid2x2_Row1Col1?.data?.attributes?.url}`"
      />
    </Motion>
    <Motion
      :initial="SLIDE_UP.INITIAL"
      :in-view="SLIDE_UP.IN_VIEW"
      :transition="{ ...TRANSITION.DEFAULT, delay: 0.2 }"
    >
      <Image
        class="image-grid-2x2-dynamic-image"
        :src="`${config.public.strapiImagePath}${imageGrid2x2_Row1Col2?.data?.attributes?.url}`"
      />
    </Motion>
    <Motion
      :initial="SLIDE_UP.INITIAL"
      :in-view="SLIDE_UP.IN_VIEW"
      :transition="{ ...TRANSITION.DEFAULT, delay: 0.4 }"
    >
      <Image
        class="image-grid-2x2-dynamic-image"
        :src="`${config.public.strapiImagePath}${imageGrid2x2_Row2Col1?.data?.attributes?.url}`"
      />
    </Motion>
    <Motion
      :initial="SLIDE_UP.INITIAL"
      :in-view="SLIDE_UP.IN_VIEW"
      :transition="{ ...TRANSITION.DEFAULT, delay: 0.6 }"
    >
      <Image
        class="image-grid-2x2-dynamic-image"
        :src="`${config.public.strapiImagePath}${imageGrid2x2_Row2Col2?.data?.attributes?.url}`"
      />
    </Motion>
  </div>
</template>

<script lang="ts" setup>
import { SLIDE_UP, TRANSITION } from '~/animations.config.json'
import type { StrapiMedia } from '~/types/common'

type Props = {
  imageGrid2x2_Row1Col1?: StrapiMedia
  imageGrid2x2_Row1Col2?: StrapiMedia
  imageGrid2x2_Row2Col1?: StrapiMedia
  imageGrid2x2_Row2Col2?: StrapiMedia
}
const props = withDefaults(defineProps<Props>(), {})
const config = useRuntimeConfig()
</script>

<style lang="postcss" scoped>
.image-grid-2x2-dynamic {
  @apply grid grid-cols-2 gap-3 rounded-[14px] overflow-hidden select-none;

  & .image-grid-2x2-dynamic-image {
    @apply w-full h-[400px] object-cover;
  }
}
@media only screen and (max-width: 980px) {
  .image-grid-2x2-dynamic {
    & .image-grid-2x2-dynamic-image {
    }
  }
}
</style>
