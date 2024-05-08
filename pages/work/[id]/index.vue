<template>
  <main class="main">
    <section id="work-hero" class="work-hero-section">
      <Video
        class="work-hero"
        autoplay
        :videoUrl="`${config.public.strapiImagePath}${work?.attributes?.previewVideo?.data?.attributes?.url}`"
      />
      <div class="work-hero-title-ct center">
        <H tag="h2" v-if="work?.attributes.title" class="hero-title">
          {{ work?.attributes.title }}
        </H>
        <P v-if="work?.attributes.copy" class="hero-copy">
          {{ work?.attributes.copy }}
        </P>
      </div>
    </section>

    <section id="dynamic" class="dynamic-section center">
      <template v-for="item in work?.attributes.dynamic">
        <TextDynamic v-if="item.__component === 'work-dynamic.text'" :content="item.textContent" />
        <VideoDynamic
          v-if="item.__component === 'work-dynamic.video'"
          :content="item.videoContent"
        />
        <ImageDynamic
          v-if="item.__component === 'work-dynamic.image'"
          :content="item.imageContent"
        />
      </template>
    </section>
  </main>
</template>

<script lang="ts" setup>
import type { Work } from '~/types/work'

const { t } = useI18n()
const route = useRoute()

useHead({
  title: t('contacts.companySimpleName') + ' | ' + t('pg.work.meta.title'),
  meta: [{ name: 'description', content: t('pg.work.meta.description') }],
})

const config = useRuntimeConfig()
const { data: wd } = await useFetch(
  `${config.public.strapiUrl}/works/${route.params.id}?&populate[dynamic][populate]=*&populate[previewVideo][populate]=*`
)
const work = computed(() => (wd.value as any)?.data as Work)
</script>

<style lang="postcss" scoped>
.main {
  & .work-hero-section {
    & .work-hero-title-ct {
      @apply flex flex-col py-10;
    }
  }
}

@media only screen and (max-width: 980px) {
  .main {
  }
}
</style>
