<template>
  <main class="main">
    <section id="work" class="work-section">
      <H tag="h1" class="work-title">{{ $t('pg.work.title') }}</H>
      <div class="work-carousel">
        <Motion
          v-for="(work, i) in works"
          tag="div"
          :initial="OPACITY.INITIAL"
          :in-view="OPACITY.IN_VIEW"
          :transition="{ ...TRANSITION.DEFAULT }"
        >
          <WorkCard :work="work" />
        </Motion>
      </div>
    </section>
  </main>
</template>

<script lang="ts" setup>
import { OPACITY, TRANSITION } from '../../animations.config.json'
import type { Work } from '~/types/work'

const { t } = useI18n()

const config = useRuntimeConfig()
const { data: wd } = await useFetch(`${config.public.strapiUrl}/works?populate=*&sort=worksDate`)
const works = computed(() => (wd.value as any)?.data as Work[])

// SEO
useHead({
  title: t('pg.work.meta.title') + ' | ' + t('contacts.companySimpleName'),
  meta: [{ name: 'description', content: t('pg.work.meta.description') }],
})
</script>

<style lang="postcss" scoped>
.main {
  @apply pt-56;

  & .work-section {
    @apply -space-y-4 px-5;

    & .work-title {
      @apply uppercase;
    }

    & .work-carousel {
      @apply grid grid-cols-4 gap-3;
    }
  }
}

@media only screen and (max-width: 980px) {
  .main {
    @apply pt-32;

    & .work-section {
      @apply -space-y-2;

      & .work-carousel {
        @apply grid grid-cols-2 gap-y-4;
      }
    }
  }
}
</style>
