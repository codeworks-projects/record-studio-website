<template>
  <section id="hero" class="hero-section">
    <Motion
      tag="div"
      class="hero-grid"
      :initial="OPACITY.INITIAL"
      :in-view="OPACITY.IN_VIEW"
      :transition="{ ...TRANSITION.DEFAULT, delay: 0.5 }"
    >
      <div class="hero-grid-col hero-grid-col-1" v-if="heroVideo?.col_1">
        <Video
          v-for="item in heroVideo.col_1.data"
          class="hero-video"
          autoplay
          :videoUrl="`${$config.public.strapiImagePath}${item.attributes?.url}`"
        />
      </div>
      <div class="hero-grid-col hero-grid-col-2" v-if="heroVideo?.col_2">
        <Video
          v-for="item in heroVideo.col_2.data"
          class="hero-video"
          autoplay
          :videoUrl="`${$config.public.strapiImagePath}${item.attributes?.url}`"
        />
      </div>
      <div class="hero-grid-col hero-grid-col-3" v-if="heroVideo?.col_3">
        <Video
          v-for="item in heroVideo.col_3.data"
          class="hero-video"
          autoplay
          :videoUrl="`${$config.public.strapiImagePath}${item.attributes?.url}`"
        />
      </div>
    </Motion>

    <div class="hero-text-ct">
      <Motion
        tag="div"
        class="center"
        :initial="SLIDE_UP.INITIAL"
        :in-view="SLIDE_UP.IN_VIEW"
        :transition="{ ...TRANSITION.DEFAULT, delay: 0.5 }"
      >
        <div class="hero-text-top">
          <h1>{{ $t('pg.home.heroTitle1') }}</h1>
          <Motion
            tag="p"
            class="small-text"
            v-html="markdownParser($t('pg.home.heroSmallTitle'))"
            :initial="SLIDE_RIGHT.INITIAL"
            :in-view="SLIDE_RIGHT.IN_VIEW"
            :transition="{ ...TRANSITION.DEFAULT, delay: 1 }"
          />
        </div>
        <h1>{{ $t('pg.home.heroTitle2') }}</h1>
        <h1 v-html="markdownParser($t('pg.home.heroTitle3'))" />
      </Motion>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { SLIDE_UP, SLIDE_RIGHT, OPACITY, TRANSITION } from '~/animations.config.json'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { HeroVideo } from '~/types/work'

gsap.registerPlugin(ScrollTrigger)

type Props = {
  heroVideo: HeroVideo
}

const props = defineProps<Props>()

onMounted(() => {
  const t = gsap.timeline({
    scrollTrigger: {
      trigger: '.hero-section',
      pin: true,
      start: 'top top',
      end: `bottom top+=${vh(20)}`,
      scrub: 0.8,
    },
  })

  t.fromTo(
    '.hero-grid',
    {
      scale: '0.4',
      rotateZ: '-30deg',
    },
    {
      rotateZ: 0,
      scale: '1',
      gap: '60px',
    },
    0
  )
  t.to('.hero-grid-col', { gap: '60px' }, 0)
  t.fromTo('.hero-grid-col-1', { translateY: '-36vh' }, { translateY: 0 }, 0)
  t.fromTo('.hero-grid-col-2', { translateY: '-4vh' }, { translateY: 0 }, 0)
  t.fromTo('.hero-grid-col-3', { translateY: '24vh' }, { translateY: 0 }, 0)

  t.to('.hero-text-ct', { backgroundColor: 'rgba(0, 0, 0, 0)' }, 0)
  t.to('.hero-text-ct', { filter: 'blur(100px)' }, '<20%')
  t.to('.hero-text-ct', { opacity: 0 }, '<20%')
  t.to('.hero-text-ct', { scale: '1.1' }, '<30%')
})
</script>

<style lang="postcss" scoped>
.hero-section {
  @apply relative overflow-hidden;
  @apply text-white font-bold;
  @apply uppercase flex flex-col h-screen;
  /* @apply !left-0 !right-0 !top-0 !bottom-0 !max-w-full !w-full !h-screen !max-h-screen; */

  font-size: min(9vw, 100px);
  line-height: min(8vw, 90px);

  & .hero-grid {
    @apply absolute left-0 right-0 top-0 bottom-0 flex justify-center items-center gap-[40px];

    & .hero-grid-col {
      @apply flex flex-col gap-[40px];
    }

    & .hero-video {
      @apply w-full h-screen rounded-[14px] overflow-hidden;
    }
  }

  & .hero-text-ct {
    @apply absolute top-0 bottom-0 left-0 right-0 flex flex-col items-start justify-center;
    background-color: rgba(0, 0, 0, 0.7);

    & .hero-text-top {
      @apply flex items-center pt-36;

      & .small-text {
        @apply font-medium normal-case;

        font-size: min(1.1vw, 14px);
        line-height: min(1.6vw, 18px);
      }
    }
  }
}

@media only screen and (max-width: 980px) {
  .hero-section {
    & .hero-text-top {
      & .small-text {
        @apply hidden;
      }
    }
  }
}
</style>
