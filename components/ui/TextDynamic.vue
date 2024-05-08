<template>
  <div v-if="content" class="text-dynamic">
    <P>{{ content }}</P>
  </div>
</template>

<script lang="ts" setup>
type Props = {
  content?: string
}
const props = withDefaults(defineProps<Props>(), {})
</script>

<style lang="postcss" scoped>
.text-dynamic {
  @apply my-10;
}
@media only screen and (max-width: 980px) {
  .text-dynamic {
  }
}
</style>
