<template>
  <Motion
    :tag="tag"
    :initial="animated ? SLIDE_UP.INITIAL : undefined"
    :in-view="animated ? SLIDE_UP.IN_VIEW : undefined"
    :transition="animated ? TRANSITION.DEFAULT : undefined"
    :class="{
      title: true,
      [`is-${tag}`]: tag,
    }"
  >
    <slot />
  </Motion>
</template>

<script lang="ts" setup>
import { SLIDE_UP, TRANSITION } from '~/animations.config.json'

type Props = {
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  animated?: boolean
}

withDefaults(defineProps<Props>(), {
  tag: 'h2',
  animated: true,
})
</script>

<style lang="postcss" scoped>
.title {
  @apply font-title text-white max-w-[850px] font-normal leading-tight;

  &.is-h1 {
    @apply text-[90px] mb-4;
  }

  &.is-h2 {
    @apply text-[60px];
  }

  &.is-h3 {
    @apply text-[40px];
  }

  &.is-h4 {
    @apply text-[24px];
  }

  &.is-h5 {
    @apply text-[16px];
  }
}

@media only screen and (max-width: 980px) {
  .title {
    &.is-h1 {
      @apply text-[60px];
    }

    &.is-h2 {
      @apply text-[40px];
    }

    &.is-h3 {
      @apply text-[30px];
    }

    &.is-h4 {
      @apply text-[18px];
    }

    &.is-h5 {
      @apply text-[16px];
    }
  }
}
</style>
