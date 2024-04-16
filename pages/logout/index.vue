<template>
  <div class="logout-view">{{ $t("common.loggingOut") }}...</div>
</template>

<script setup lang="ts">
const router = useRouter();
const localePath = useLocalePath();

// Execution
logOutCurrentUser();
router.push(localePath("/login"));
</script>

<style lang="postcss" scoped>
.logout-view {
  @apply flex items-center justify-center h-screen text-xl;
}
</style>
