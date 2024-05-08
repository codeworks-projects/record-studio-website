<template>
  <div v-if="content" class="image-dynamic">
    <Image
      class="image-dynamic-image"
      :src="`${config.public.strapiImagePath}${content?.data?.attributes?.url}`"
    />
  </div>
</template>

<script lang="ts" setup>
import type { StrapiMedia } from '~/types/common'

type Props = {
  content?: StrapiMedia
}
const config = useRuntimeConfig()
const props = withDefaults(defineProps<Props>(), {})
</script>

<style lang="postcss" scoped>
.image-dynamic {
  @apply my-10 rounded-[14px] overflow-hidden w-full h-[400px];

  & .image-dynamic-image {
    @apply w-full h-[400px] object-contain;
  }
}
@media only screen and (max-width: 980px) {
  .image-dynamic {
  }
}
</style>
