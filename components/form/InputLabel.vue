<template>
  <label> {{ text }} <sup v-if="required" class="text-red">*</sup> </label>
</template>

<script lang="ts" setup>
type Props = {
  text?: string
  required?: boolean
}

withDefaults(defineProps<Props>(), {
  text: '',
})
</script>

<style lang="postcss" scoped>
label {
  @apply block text-sm text-black font-semibold mb-1;
}
</style>
