<template>
  <div class="image-grid-1x3-dynamic">
    <Image
      class="image-grid-1x3-dynamic-image"
      :src="`${config.public.strapiImagePath}${imageGrid1x3_Row1Col1?.data?.attributes?.url}`"
    />
    <Image
      class="image-grid-1x3-dynamic-image"
      :src="`${config.public.strapiImagePath}${imageGrid1x3_Row1Col2?.data?.attributes?.url}`"
    />
    <Image
      class="image-grid-1x3-dynamic-image"
      :src="`${config.public.strapiImagePath}${imageGrid1x3_Row1Col3?.data?.attributes?.url}`"
    />
  </div>
</template>

<script lang="ts" setup>
import type { StrapiMedia } from '~/types/common'

type Props = {
  imageGrid1x3_Row1Col1?: StrapiMedia
  imageGrid1x3_Row1Col2?: StrapiMedia
  imageGrid1x3_Row1Col3?: StrapiMedia
}
const props = withDefaults(defineProps<Props>(), {})
const config = useRuntimeConfig()
</script>

<style lang="postcss" scoped>
.image-grid-1x3-dynamic {
  @apply grid grid-cols-3 gap-3 rounded-[14px] overflow-hidden select-none;

  & .image-grid-1x3-dynamic-image {
    /* @apply w-full h-[400px] object-cover; */
  }
}
@media only screen and (max-width: 980px) {
  .image-grid-1x3-dynamic {
    @apply grid-cols-1;

    & .image-grid-1x3-dynamic-image {
    }
  }
}
</style>
