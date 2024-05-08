<template>
  <Motion
    tag="p"
    :initial="animated ? SLIDE_UP.INITIAL : undefined"
    :in-view="animated ? SLIDE_UP.IN_VIEW : undefined"
    :transition="animated ? TRANSITION.DEFAULT : undefined"
    :class="{
      'font-subtitle': subtitle,
    }"
  >
    <slot />
  </Motion>
</template>

<script lang="ts" setup>
import { SLIDE_UP, TRANSITION } from '~/animations.config.json'

type Props = {
  animated?: boolean
  subtitle?: boolean
}

withDefaults(defineProps<Props>(), {
  animated: true,
})
</script>

<style lang="postcss" scoped>
p {
  @apply max-w-[850px] text-white leading-relaxed;
}
</style>
