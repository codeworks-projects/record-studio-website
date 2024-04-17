<template>
  <Motion
    :tag="tag"
    :initial="SLIDE_UP.INITIAL"
    :in-view="SLIDE_UP.IN_VIEW"
    :transition="TRANSITION.DEFAULT"
    :class="{
      title: true,
      'is-lg': size === 'large',
      'is-xl': size === 'extra-large',
      'is-2xl': size === 'double-extra-large',
      uppercase,
    }"
  >
    <slot />
  </Motion>
</template>

<script lang="ts" setup>
import { SLIDE_UP, TRANSITION } from '~/animations.config.json'

type Props = {
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  size?: undefined | 'large' | 'extra-large' | 'double-extra-large'
  uppercase?: boolean
}

withDefaults(defineProps<Props>(), {
  tag: 'h2',
  size: undefined,
  uppercase: false,
})
</script>

<style lang="postcss" scoped>
.title {
  @apply text-2xl whitespace-pre-line max-w-[550px] font-title;

  &.is-lg {
    @apply text-3xl;
  }

  &.is-xl {
    @apply text-4xl;
  }

  &.is-2xl {
    @apply text-5xl;
  }
}

@media only screen and (max-width: 980px) {
  .title {
    &.is-lg {
      @apply text-xl;
    }

    &.is-xl {
      @apply text-3xl;
    }

    &.is-2xl {
      @apply text-4xl;
    }
  }
}
</style>
