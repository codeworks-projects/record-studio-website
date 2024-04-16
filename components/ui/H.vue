<template>
  <Motion
    :tag="tag"
    :initial="animated ? SLIDE_UP.INITIAL : undefined"
    :in-view="animated ? SLIDE_UP.IN_VIEW : undefined"
    :transition="animated ? TRANSITION.DEFAULT : undefined"
    :class="{
      title: true,
      uppercase,
      [`is-${size}`]: size,
    }"
  >
    <slot />
  </Motion>
</template>

<script lang="ts" setup>
import { SLIDE_UP, TRANSITION } from '~/animations.config.json'

type Props = {
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  size?: 'large' | '3x-large' | '4x-large' | '5x-large'
  uppercase?: boolean
  animated?: boolean
}

withDefaults(defineProps<Props>(), {
  tag: 'h2',
  size: undefined,
  uppercase: false,
  animated: true
})
</script>

<style lang="postcss" scoped>
.title {
  @apply text-2xl whitespace-pre-line max-w-[850px] font-title;

  &.is-3x-large {
    @apply text-3xl;
  }

  &.is-4x-large {
    @apply text-4xl;
  }

  &.is-5x-large {
    @apply text-5xl;
  }
}

/* @media only screen and (max-width: 980px) {
  .title {
    &.is-large {
      @apply text-xl;
    }

    &.is-extra-large {
      @apply text-3xl;
    }

    &.is-double-extra-large {
      @apply text-4xl;
    }
  }
} */
</style>
