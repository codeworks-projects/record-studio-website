<template>
  <div v-if="imageContent" class="image-dynamic">
    <Image
      class="image-dynamic-image"
      :src="`${config.public.strapiImagePath}${imageContent?.data?.attributes?.url}`"
    />
  </div>
</template>

<script lang="ts" setup>
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
