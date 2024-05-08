<template>
  <div v-if="content" class="video-dynamic">
    <Video
      class="work-hero"
      autoplay
      :videoUrl="`${config.public.strapiImagePath}${content?.data?.attributes?.url}`"
      :muted="muted"
    />
    <div class="muted-icon-ct clickable">
      <Icon class="muted-icon" v-if="!muted" name="speaker-wave" @click="toggleMuted()" />
      <Icon class="muted-icon" v-else name="speaker-x-mark" @click="toggleMuted()" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { StrapiMedia } from '~/types/common'

type Props = {
  content?: StrapiMedia
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
  @apply relative my-10 rounded-[14px] overflow-hidden;

  & .muted-icon-ct {
    @apply absolute bottom-5 right-5 bg-white rounded-full w-8 h-8 flex items-center justify-center;

    & .muted-icon {
      @apply w-5 h-5;
    }
  }
}
@media only screen and (max-width: 980px) {
  .video-dynamic {
  }
}
</style>
