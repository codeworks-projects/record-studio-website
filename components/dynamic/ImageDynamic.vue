<template>
  <Motion
    tag="div"
    v-if="imageContent"
    class="image-dynamic"
    :initial="SLIDE_UP.INITIAL"
    :in-view="SLIDE_UP.IN_VIEW"
    :transition="TRANSITION.DEFAULT"
  >
    <Image
      class="image-dynamic-image"
      :src="`${config.public.strapiImagePath}${imageContent?.data?.attributes?.url}`"
    />
  </Motion>
</template>

<script lang="ts" setup>
import { SLIDE_UP, TRANSITION } from '~/animations.config.json'
import type { StrapiMedia } from '~/types/common'

type Props = {
  imageContent?: StrapiMedia
}
const config = useRuntimeConfig()
const props = withDefaults(defineProps<Props>(), {})
</script>

<style lang="postcss" scoped>
.image-dynamic {
  @apply rounded-[14px] overflow-hidden;

  & .image-dynamic-image {
    /* @apply w-full h-[400px] object-cover; */
  }
}
@media only screen and (max-width: 980px) {
  .image-dynamic {
  }
}
</style>
