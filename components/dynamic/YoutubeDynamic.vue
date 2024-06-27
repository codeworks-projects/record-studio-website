<template>
  <div class="youtube-dynamic">
    <iframe
      class="youtube-iframe"
      :src="`https://www.youtube-nocookie.com/embed/${youtubeID}?loop=1&playlist=${youtubeID}`"
      frameborder="0"
    ></iframe>
  </div>
</template>

<script lang="ts" setup>
type Props = {
  youtubeID?: string
}
const props = withDefaults(defineProps<Props>(), {})
</script>

<style lang="postcss" scoped>
.youtube-dynamic {
  @apply rounded-[14px] overflow-hidden;

  & .youtube-iframe {
    @apply w-full h-[600px] object-cover;
  }
}
@media only screen and (max-width: 980px) {
  .youtube-dynamic {
  }
}
</style>

<!-- OpNFvPEwSJ8 -->
