<template>
  <main class="main">
    <section id="hero" class="hero-section">
      <Motion
        tag="div"
        class="hero-grid"
        :initial="OPACITY.INITIAL"
        :in-view="OPACITY.IN_VIEW"
        :transition="{ ...TRANSITION.DEFAULT, delay: 0.5 }"
      >
        <div class="hero-grid-col hero-grid-col-1">
          <Video
            class="hero-video"
            autoplay
            videoUrl="https://codeworks-clients-public.s3.eu-west-1.amazonaws.com/recordstudio/video/home.mp4"
          />
          <Video
            class="hero-video"
            autoplay
            videoUrl="https://codeworks-clients-public.s3.eu-west-1.amazonaws.com/recordstudio/video/home.mp4"
          />
          <Video
            class="hero-video"
            autoplay
            videoUrl="https://codeworks-clients-public.s3.eu-west-1.amazonaws.com/recordstudio/video/home.mp4"
          />
        </div>
        <div class="hero-grid-col hero-grid-col-2">
          <Video
            class="hero-video"
            autoplay
            videoUrl="https://codeworks-clients-public.s3.eu-west-1.amazonaws.com/recordstudio/video/home.mp4"
          />
          <Video
            class="hero-video"
            autoplay
            videoUrl="https://codeworks-clients-public.s3.eu-west-1.amazonaws.com/recordstudio/video/home.mp4"
          />
          <Video
            class="hero-video"
            autoplay
            videoUrl="https://codeworks-clients-public.s3.eu-west-1.amazonaws.com/recordstudio/video/home.mp4"
          />
          <Video
            class="hero-video"
            autoplay
            videoUrl="https://codeworks-clients-public.s3.eu-west-1.amazonaws.com/recordstudio/video/home.mp4"
          />
          <Video
            class="hero-video"
            autoplay
            videoUrl="https://codeworks-clients-public.s3.eu-west-1.amazonaws.com/recordstudio/video/home.mp4"
          />
        </div>
        <div class="hero-grid-col hero-grid-col-3">
          <Video
            class="hero-video"
            autoplay
            videoUrl="https://codeworks-clients-public.s3.eu-west-1.amazonaws.com/recordstudio/video/home.mp4"
          />
          <Video
            class="hero-video"
            autoplay
            videoUrl="https://codeworks-clients-public.s3.eu-west-1.amazonaws.com/recordstudio/video/home.mp4"
          />
          <Video
            class="hero-video"
            autoplay
            videoUrl="https://codeworks-clients-public.s3.eu-west-1.amazonaws.com/recordstudio/video/home.mp4"
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

    <section id="carousel" class="carousel-section">
      <template v-for="workArray in groupedWorks">
        <template v-if="workArray.length > 1">
          <div class="carousel-row">
            <VideoButton v-for="work in workArray" :work="work" />
          </div>
        </template>
        <VideoButton v-else :work="workArray[0]" />
      </template>
      <NuxtLink class="carousel-cta" :to="localePath('/work')">
        <Button :animated="false" :value="$t('pg.home.discoverAllProjects')" />
      </NuxtLink>
    </section>

    <section id="collaborations" class="collaborations-section">
      <H tag="h3" class="collaborations-section-title">{{ $t('pg.home.workAndCollaborations') }}</H>
      <div class="partners-ct">
        <template v-for="(partner, i) in partners">
          <Motion
            v-if="partner?.attributes.logo.data?.attributes.url"
            :href="partner?.attributes.link"
            target="_blank"
            class="partner-image"
            :class="{ clickable: partner?.attributes.link }"
            tag="a"
            :initial="OPACITY.INITIAL"
            :in-view="OPACITY.IN_VIEW"
            :transition="{ ...TRANSITION.DEFAULT, delay: i / 10 }"
          >
            <Image
              :src="`${config.public.strapiImagePath}${partner?.attributes.logo.data?.attributes.url}`"
            />
          </Motion>
        </template>
      </div>
    </section>
  </main>
</template>

<script lang="ts" setup>
import { SLIDE_UP, SLIDE_RIGHT, OPACITY, TRANSITION } from '../animations.config.json'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { Partner } from '~/types/partner'
import type { Work } from '~/types/work'

const { t } = useI18n()
const localePath = useLocalePath()

useHead({
  title: t('contacts.companySimpleName') + ' | ' + t('pg.home.meta.title'),
  meta: [{ name: 'description', content: t('pg.home.meta.description') }],
})

const config = useRuntimeConfig()
const { data: pd } = await useFetch(`${config.public.strapiUrl}/partners?populate=*`)
const partners = computed(() => (pd.value as any)?.data as Partner[])

const { data: wd } = await useFetch(`${config.public.strapiUrl}/works?populate=*&sort=createdAt`)
const works = computed(() => (wd.value as any)?.data as Work[])

const groupedWorks = computed(() => {
  const grouped = []
  let i = 0

  while (i < works.value.length) {
    grouped.push(works.value.slice(i, i + 2))
    i += 2
    grouped.push(works.value.slice(i, i + 1))
    i += 1
  }

  return grouped
})

gsap.registerPlugin(ScrollTrigger)

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
.main {
  & .hero-section {
    @apply relative overflow-hidden;
    @apply text-white font-bold;
    @apply uppercase h-screen flex flex-col;

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

  & .carousel-section {
    @apply flex flex-col gap-10 py-10 px-5;

    & .carousel-row {
      @apply flex gap-3;
    }

    & .carousel-cta {
      @apply self-center lowercase text-end;
    }
  }

  & .collaborations-section {
    @apply flex flex-col items-center pt-24 px-5;

    & .collaborations-section-title {
      @apply uppercase text-center mb-5;
    }

    & .partners-ct {
      @apply grid grid-cols-7 gap-3 pt-5;

      & .partner-image {
        @apply w-[130px] h-[50px] object-contain;
      }
    }
  }
}

@media only screen and (max-width: 980px) {
  .main {
    & .carousel-section {
      @apply gap-3;

      & .carousel-row {
        @apply flex-col gap-3;
      }

      & .carousel-cta {
        @apply min-w-max pt-10;
      }
    }

    & .collaborations-section {
      & .partners-ct {
        @apply grid-cols-3;

        & .partner-image {
          @apply w-[100px] h-[40px];
        }
      }
    }
  }
}
</style>
