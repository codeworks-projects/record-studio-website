<template>
  <div class="gallery-ct">
    <NuxtMarquee :speed="20" id="numbers" :pause-on-hover="true" class="marquee-wrapper">
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

    <!-- Mobile: simple horizontal snap-scroller (visible only on small screens) -->
    <div role="list" class="snap-wrapper">
      <div
        v-for="(video, index) in videos"
        :key="`snap-${index}`"
        role="listitem"
        class="vimeo-dynamic"
      >
        <iframe
          class="vimeo-iframe"
          :src="`https://player.vimeo.com/video/${video.vimeoId}?loop=1&autopause=0&dnt=1`"
          frameborder="0"
          allow="autoplay; fullscreen"
          allowfullscreen
        ></iframe>
      </div>
    </div>
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

.snap-wrapper {
  @apply !hidden;
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

  .marquee-wrapper {
    @apply !hidden;
  }

  .snap-wrapper {
    @apply !flex overflow-x-auto gap-2 px-5 py-4 snap-x snap-mandatory;
    -webkit-overflow-scrolling: touch;

    & .vimeo-dynamic {
      @apply w-[250px] h-[440px] mx-0 flex-none;

      scroll-snap-align: center;
    }
  }
}
</style>
