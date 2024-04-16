<template>Example private area with login middleware</template>

<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
});
</script>

<style lang="postcss" scoped></style>
