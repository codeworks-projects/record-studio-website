<template>
  <Motion
    tag="p"
    :initial="animated ? SLIDE_UP.INITIAL : undefined"
    :in-view="animated ? SLIDE_UP.IN_VIEW : undefined"
    :transition="animated ? TRANSITION.DEFAULT : undefined"
    class="paragraph"
    :class="{
      paragraph: true,
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
  size?: 'small' | 'large' | 'x-large' | '2x-large'
  uppercase?: boolean
  animated?: boolean
}

withDefaults(defineProps<Props>(), {
  animated: true
})
</script>

<style lang="postcss" scoped>
.paragraph {
  @apply text-base whitespace-pre-line max-w-[850px] leading-relaxed;

  &.is-small {
    @apply text-sm;
  }

  &.is-large {
    @apply text-lg;
  }

  &.is-x-large {
    @apply text-xl;
  }

  &.is-2x-large {
    @apply text-2xl;
  }
}

/* @media only screen and (max-width: 980px) {
  .paragraph {
    &.is-extra-large {
      @apply text-lg;
    }

    &.is-double-extra-large {
      @apply text-xl;
    }
  }
} */
</style>
