<template>
  <div class="gallery-ct">
    <NuxtMarquee :speed="20" id="numbers" :pause-on-hover="true">
      <div v-for="(video, index) in videos" :key="index" class="vimeo-dynamic">
        <iframe
          class="vimeo-iframe"
          :src="`https://player.vimeo.com/video/${video.vimeoId}?loop=1&autopause=0&dnt=1`"
          frameborder="0"
          allow="autoplay; fullscreen"
          allowfullscreen
        ></iframe>
      </div>
    </NuxtMarquee>
  </div>
</template>

<script lang="ts" setup>
import type { GalleryVideo } from '~/types/work'

type Props = {
  videos?: GalleryVideo[]
}
const props = withDefaults(defineProps<Props>(), {})
</script>

<style lang="postcss" scoped>
.gallery-ct {
  @apply w-screen -ml-[calc(4rem/2)];
}

.vimeo-dynamic {
  @apply relative rounded-[14px] overflow-hidden w-[300px] h-[532px] mx-8;

  & .vimeo-iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 0;
  }
}
@media only screen and (min-width: 1420px) {
  .gallery-ct {
    @apply -ml-[calc((100vw-1420px)/2)];
  }
}
@media only screen and (max-width: 980px) {
  .gallery-ct {
    @apply w-screen -ml-[calc(2rem/2)];
  }

  .vimeo-dynamic {
    @apply w-[250px] h-[440px] mx-4;
  }
}
</style>
