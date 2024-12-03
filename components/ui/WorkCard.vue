<template>
  <NuxtLink class="work-card clickable" :to="localePath(`/work/${work?.id.toString()}`)">
    <VideoWrapper
      :video-url="
        work?.attributes?.minimizedPreviewVideo?.data?.attributes?.url ||
        work?.attributes?.previewVideo?.data?.attributes?.url
      "
      :image-url="work?.attributes?.previewImage?.data?.attributes?.url"
      rounded
    />
    <div class="work-card-text-ct">
      <H :animated="false" v-if="work?.attributes.title" tag="h5" class="video-title">{{
        work?.attributes.title
      }}</H>
      <P :animated="false" v-if="work?.attributes.category" class="video-subtitle">
        {{ $t(`enum.work.${work?.attributes.category}`) }}
      </P>
    </div>
  </NuxtLink>
</template>

<script lang="ts" setup>
import type { Work } from '~/types/work'

type Props = {
  work: Work
}

const localePath = useLocalePath()
const config = useRuntimeConfig()
const props = withDefaults(defineProps<Props>(), {})
</script>

<style lang="postcss" scoped>
.work-card {
  @apply relative flex-grow flex flex-col gap-2;

  & .work-card-text-ct {
    @apply font-bold -space-y-2;

    & .video-title {
      @apply uppercase;
    }

    & .video-subtitle {
      @apply text-dark-opacity pt-2;
    }
  }
}
@media only screen and (max-width: 980px) {
  .work-card {
    & .work-card-text-ct {
      & .video-title {
        @apply text-sm;
      }
    }
  }
}
</style>
