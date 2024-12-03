<template>
  <Motion
    tag="div"
    class="video-btn clickable"
    :initial="SLIDE_UP.INITIAL"
    :in-view="SLIDE_UP.IN_VIEW"
    :transition="TRANSITION.DEFAULT"
  >
    <NuxtLink ref="btnHover" :to="localePath(`/work/${work?.id.toString()}`)">
      <VideoWrapper
        :video-url="
          work?.attributes?.minimizedPreviewVideo?.data?.attributes?.url ||
          work?.attributes?.previewVideo?.data?.attributes?.url
        "
        :image-url="work?.attributes?.previewImage?.data?.attributes?.url"
      />
      <div class="video-btn-text-ct">
        <H :animated="false" v-if="work?.attributes.title" tag="h4" class="video-title">
          {{ work?.attributes.title }}
        </H>
        <P :animated="false" v-if="work?.attributes.category" class="video-subtitle" subtitle>
          {{ $t(`enum.work.${work?.attributes.category}`) }}
        </P>
      </div>
    </NuxtLink>
  </Motion>
</template>

<script lang="ts" setup>
import { SLIDE_UP, TRANSITION } from '../../animations.config.json'
import type { Work } from '~/types/work'

type Props = {
  work: Work
}

const localePath = useLocalePath()
const config = useRuntimeConfig()

const props = withDefaults(defineProps<Props>(), {})
</script>

<style lang="postcss" scoped>
.video-btn {
  @apply relative rounded-[14px] overflow-hidden flex-grow;

  & .video-btn-text-ct {
    @apply absolute bottom-5 left-5 space-y-1;

    & .video-title {
      @apply uppercase leading-6;
    }

    & .video-subtitle {
      @apply text-lg lowercase;
    }
  }
}
@media only screen and (max-width: 980px) {
  .video-btn {
    & .video-btn-text-ct {
      @apply -space-y-2;

      & .video-subtitle {
        @apply italic text-[16px];
      }
    }
  }
}
</style>
