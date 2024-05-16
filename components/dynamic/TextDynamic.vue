<template>
  <div v-if="textContent" class="text-dynamic">
    <P>{{ textContent }}</P>
  </div>
</template>

<script lang="ts" setup>
type Props = {
  textContent?: string
}
const props = withDefaults(defineProps<Props>(), {})
</script>

<style lang="postcss" scoped>
.text-dynamic {
  @apply font-medium;
}
@media only screen and (max-width: 980px) {
  .text-dynamic {
  }
}
</style>
