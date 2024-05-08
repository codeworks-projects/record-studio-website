<template>
  <nav class="menu">
    <!-- code -->
  </nav>
</template>

<script lang="ts" setup>
type Props = {
  vertical?: boolean
}
const props = withDefaults(defineProps<Props>(), {})
</script>

<style lang="postcss" scoped>
.menu {
}
</style>
