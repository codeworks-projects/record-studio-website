<template>
  <div class="video-ct">
    <video
      class="object-cover"
      ref="video"
      :src="videoUrl"
      :poster="imageUrl"
      :autoplay="autoplay"
      :muted="autoplay"
      :loop="autoplay"
      :controls="!autoplay && playing"
      preload="metadata"
      playsinline
    />
    <div class="overlay" />
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    videoUrl?: string
    imageUrl?: string
    autoplay?: boolean
  }>(),
  {
    videoUrl: undefined,
    imageUrl: undefined,
    autoplay: true,
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
  @apply absolute top-0 bottom-0 left-0 right-0;

  & video,
  & img {
    @apply absolute w-full h-full object-cover;
  }

  & img {
    @apply z-[1];
  }

  & svg {
    @apply relative h-16 w-16 z-[1]
    fill-light-grey opacity-90 cursor-pointer;
  }

  & .overlay {
    @apply absolute w-full h-full bg-black opacity-40;
  }
}
</style>
