<template>
  <Motion
    tag="p"
    :initial="SLIDE_UP.INITIAL"
    :in-view="SLIDE_UP.IN_VIEW"
    :transition="TRANSITION.DEFAULT"
    class="paragraph"
    :class="{
      paragraph: true,
      'is-sm': size === 'small',
      'is-lg': size === 'large',
      'is-xl': size === 'extra-large',
      'is-2-xl': size === 'double-extra-large',
    }"
  >
    <slot />
  </Motion>
</template>

<script lang="ts" setup>
import { SLIDE_UP, TRANSITION } from '~/animations.config.json'

type Props = {
  size?: undefined | 'small' | 'large' | 'extra-large' | 'double-extra-large'
}

withDefaults(defineProps<Props>(), {
  size: undefined,
})
</script>

<style lang="postcss" scoped>
.paragraph {
  @apply whitespace-pre-line max-w-[850px] leading-relaxed;

  &.is-sm {
    @apply text-sm;
  }

  &.is-lg {
    @apply text-lg;
  }

  &.is-xl {
    @apply text-xl;
  }

  &.is-2-xl {
    @apply text-2xl;
  }
}

@media only screen and (max-width: 980px) {
  .paragraph {
    &.is-xl {
      @apply text-lg;
    }

    &.is-2-xl {
      @apply text-xl;
    }
  }
}
</style>
