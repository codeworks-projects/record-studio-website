<template>
  <div class="vimeo-dynamic">
    <iframe
      class="vimeo-iframe"
      :src="`https://player.vimeo.com/video/${vimeoID}?loop=1&autopause=0&dnt=1`"
      frameborder="0"
      allow="autoplay; fullscreen"
      allowfullscreen
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
  @apply relative rounded-[14px] overflow-hidden w-full;
  padding-bottom: 56.25%;

  & .vimeo-iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 0;
  }
}
@media only screen and (max-width: 980px) {
  .vimeo-dynamic {
  }
}
</style>
