<template>
  <div class="vimeo-dynamic">
    <iframe
      class="vimeo-iframe"
      :src="`https://player.vimeo.com/video/${vimeoID}?autoplay=1&muted=1&loop=1&autopause=0&dnt=1`"
      frameborder="0"
    ></iframe>
  </div>
</template>

<script lang="ts" setup>
type Props = {
  vimeoID?: string
}
const props = withDefaults(defineProps<Props>(), {})
</script>

<style lang="postcss" scoped>
.vimeo-dynamic {
  @apply rounded-[14px] overflow-hidden;

  & .vimeo-iframe {
    @apply w-full h-[400px] object-cover;
  }
}
@media only screen and (max-width: 980px) {
  .vimeo-dynamic {
  }
}
</style>
