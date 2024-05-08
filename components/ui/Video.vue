<template>
  <div class="video-ct">
    <video
      class="object-cover"
      ref="video"
      :src="videoUrl"
      :poster="imageUrl"
      :autoplay="autoplay"
      :muted="muted"
      :loop="autoplay"
      :controls="!autoplay && playing"
      preload="metadata"
      playsinline
    />
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    videoUrl?: string
    imageUrl?: string
    autoplay?: boolean
    muted?: boolean
  }>(),
  {
    videoUrl: undefined,
    imageUrl: undefined,
    autoplay: false,
    muted: true,
  }
)

// Methods
const playVideo = () => {
  ;(video.value! as HTMLVideoElement).play()
  playing.value = true
}

// Data
const video = ref(null)
const playing = ref(false)
</script>

<style lang="postcss" scoped>
.video-ct {
  @apply bg-cover bg-black
  relative aspect-video w-full overflow-hidden
  flex items-center justify-center;

  & video,
  & img {
    @apply absolute w-full h-full top-0;
  }

  & img {
    @apply z-[1];
  }

  & svg {
    @apply relative h-16 w-16 z-[1]
    fill-light-grey opacity-90 cursor-pointer;
  }
}
</style>
