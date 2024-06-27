<template>
  <main class="main">
    <HomeHero v-if="heroVideo" :heroVideo="heroVideo" />

    <section id="carousel" class="carousel-section">
      <div class="carousel-grid">
        <VideoButton
          v-for="item in works"
          :class="{ big: item?.attributes.inEvidenceBig }"
          :work="item"
        />
      </div>
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
import { OPACITY, TRANSITION } from '../animations.config.json'

import type { Partner } from '~/types/partner'
import type { HeroVideo, Work } from '~/types/work'

const { t } = useI18n()
const localePath = useLocalePath()

useHead({
  title: t('contacts.companySimpleName') + ' | ' + t('pg.home.meta.title'),
  meta: [{ name: 'description', content: t('pg.home.meta.description') }],
})

const config = useRuntimeConfig()
const { data: pd } = await useFetch(`${config.public.strapiUrl}/partners?populate=*`)
const partners = computed(() => (pd.value as any)?.data as Partner[])

const { data: wd } = await useFetch(
  `${config.public.strapiUrl}/works?populate=*&sort=date&filters[inEvidence][$eq]=true`
)
const works = computed(() => (wd.value as any)?.data as Work[])

const { data: hv } = await useFetch(`${config.public.strapiUrl}/hero-video?populate=*`)
const heroVideo = computed(() => (hv.value as any)?.data.attributes as HeroVideo)
</script>

<style lang="postcss" scoped>
.main {
  & .carousel-section {
    @apply flex flex-col gap-10 py-10 px-5;

    & .carousel-grid {
      @apply grid grid-cols-2 gap-3;
      grid-auto-flow: dense;

      & .big {
        @apply col-span-2;
      }
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
