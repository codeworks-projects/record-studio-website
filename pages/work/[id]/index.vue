<template>
  <main class="main">
    <section id="work-hero" class="work-hero-section">
      <VideoWrapper
        :video-url="work?.attributes?.previewVideo?.data?.attributes?.url"
        :image-url="work?.attributes?.previewImage?.data?.attributes?.url"
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
        <TextDynamic
          v-if="item.__component === 'work-dynamic.text'"
          :textContent="item.textContent"
        />
        <VideoDynamic
          v-if="item.__component === 'work-dynamic.video'"
          :videoContent="item.videoContent"
          :videoUrl="item.videoUrl"
        />
        <ImageDynamic
          v-if="item.__component === 'work-dynamic.image'"
          :imageContent="item.imageContent"
        />
        <ImageGrid1x3
          v-if="item.__component === 'work-dynamic.image-grid1x3'"
          :imageGrid1x3_Row1Col1="item.imageGrid1x3_Row1Col1"
          :imageGrid1x3_Row1Col2="item.imageGrid1x3_Row1Col2"
          :imageGrid1x3_Row1Col3="item.imageGrid1x3_Row1Col3"
        />
        <ImageGrid2x1
          v-if="item.__component === 'work-dynamic.image-grid2x1'"
          :imageGrid2x1_Row1Col1="item.imageGrid2x1_Row1Col1"
          :imageGrid2x1_Row2Col1="item.imageGrid2x1_Row2Col1"
        />
        <ImageGrid2x2
          v-if="item.__component === 'work-dynamic.image-grid2x2'"
          :imageGrid2x2_Row1Col1="item.imageGrid2x2_Row1Col1"
          :imageGrid2x2_Row1Col2="item.imageGrid2x2_Row1Col2"
          :imageGrid2x2_Row2Col1="item.imageGrid2x2_Row2Col1"
          :imageGrid2x2_Row2Col2="item.imageGrid2x2_Row2Col2"
        />
        <YoutubeDynamic
          v-if="item.__component === 'work-dynamic.youtube'"
          :youtubeID="item.youtubeID"
        />
        <VimeoDynamic v-if="item.__component === 'work-dynamic.vimeo'" :vimeoID="item.vimeoID" />
      </template>
    </section>
  </main>
</template>

<script lang="ts" setup>
import type { Work } from '~/types/work'

const { t } = useI18n()
const route = useRoute()

const config = useRuntimeConfig()
const { data: wd } = await useFetch(
  `${config.public.strapiUrl}/works/${route.params.id}?&populate[dynamic][populate]=*&populate[previewVideo][populate]=*`
)
const work = computed(() => (wd.value as any)?.data as Work)

const seoTitle = computed(() => work.value?.attributes.metaTitle || work.value?.attributes.title)
const seoDescription = computed(
  () => work.value?.attributes.metaTitle || work.value?.attributes.copy
)

// SEO
useHead({
  title: seoTitle.value + ' | ' + t('contacts.companySimpleName'),
  meta: [{ name: 'description', content: seoDescription.value }],
})
</script>

<style lang="postcss" scoped>
.main {
  & .work-hero-section {
    & .work-hero-title-ct {
      @apply flex flex-col py-10;

      & .hero-copy {
        @apply font-medium;
      }
    }
  }

  & .dynamic-section {
    @apply flex flex-col gap-10;
  }
}

@media only screen and (max-width: 980px) {
  .main {
  }
}
</style>
