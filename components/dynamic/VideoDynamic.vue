<template>
  <Motion
    tag="div"
    v-if="videoContent"
    class="video-dynamic"
    :initial="SLIDE_UP.INITIAL"
    :in-view="SLIDE_UP.IN_VIEW"
    :transition="TRANSITION.DEFAULT"
  >
    <Video
      class="work-hero"
      autoplay
      :videoUrl="`${config.public.strapiImagePath}${videoContent?.data?.attributes?.url}`"
      :muted="muted"
    />
    <div class="action-icons-ct">
      <a
        v-if="videoUrl"
        class="icon-ct clickable"
        :href="videoUrl"
        title="video-link"
        target="_blank"
      >
        <Icon class="link-icon" name="arrow-top-right-on-square" />
      </a>
      <div class="icon-ct clickable">
        <Icon class="muted-icon" v-if="!muted" name="speaker-wave" @click="toggleMuted()" />
        <Icon class="muted-icon" v-else name="speaker-x-mark" @click="toggleMuted()" />
      </div>
    </div>
  </Motion>
</template>

<script lang="ts" setup>
import { SLIDE_UP, TRANSITION } from '~/animations.config.json'
import type { StrapiMedia } from '~/types/common'

type Props = {
  videoContent?: StrapiMedia
  videoUrl?: string
}

const muted = ref(true)
const config = useRuntimeConfig()
const props = withDefaults(defineProps<Props>(), {})

const toggleMuted = () => {
  muted.value = !muted.value
}
</script>

<style lang="postcss" scoped>
.video-dynamic {
  @apply relative rounded-[14px] overflow-hidden;

  & .action-icons-ct {
    @apply absolute bottom-5 right-5 flex gap-3;

    & .icon-ct {
      @apply bg-white rounded-full w-8 h-8 flex items-center justify-center;

      & .muted-icon {
        @apply w-5 h-5;
      }

      & .link-icon {
        @apply w-5 h-5;
      }
    }
  }
}
@media only screen and (max-width: 980px) {
  .video-dynamic {
  }
}
</style>
