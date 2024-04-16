<template>
  <p>{{ text }}</p>
</template>

<script lang="ts" setup>
type Props = {
  text?: string
}

withDefaults(defineProps<Props>(), {
  text: '',
})
</script>

<style lang="postcss" scoped>
p {
  @apply text-grey text-xs mt-2;
}
</style>
