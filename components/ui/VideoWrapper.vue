<template>
  <div class="video-wrapper">
    <Video
      v-if="url"
      class="video-wrapper-video"
      :class="{ rounded }"
      autoplay
      :videoUrl="`${config.public.strapiImagePath}${url}`"
    />
    <div v-else class="work-wrapper-video work-wrapper-fallback" :class="{ rounded }">
      <p>{{ $t('common.noVideo') }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
type Props = {
  url?: string
  rounded?: boolean
}
const props = withDefaults(defineProps<Props>(), {})
const config = useRuntimeConfig()
</script>

<style lang="postcss" scoped>
.video-wrapper {
  @apply aspect-[16/9] h-full;

  & .work-wrapper-video {
    @apply h-full;

    &.rounded {
      @apply rounded-[14px] overflow-hidden;
    }

    &.work-wrapper-fallback {
      @apply text-white/50 font-bold flex items-center justify-center bg-gray-800 lowercase;
    }
  }
}
@media only screen and (max-width: 980px) {
  .video-wrapper {
  }
}
</style>
