<template>
  <div class="wip-ct" :class="{ 'alignment-left': alignment === 'left' }">
    <div class="wip-image">
      <img src="/image/teamwork-board.png" alt="" />
    </div>
    <p class="wip-text">{{ internalText }}</p>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

type Props = {
  text?: string
  alignment?: string
}

const props = withDefaults(defineProps<Props>(), {
  text: undefined,
  alignment: undefined,
})

const internalText = computed(() => {
  return props.text || t('cmp.workInProgressNotice.featureSoon')
})
</script>

<style lang="postcss" scoped>
.wip-ct {
  @apply bg-white p-12
    flex flex-col items-center justify-center;

  &.alignment-left {
    @apply items-start;
  }

  & .wip-image {
    @apply w-80 relative;

    & img {
      @apply w-full;
    }
  }

  & .wip-text {
    @apply text-primary font-bold text-xl whitespace-pre-wrap text-center;
  }
}

@media only screen and (max-width: 980px) {
  .wip-ct {
    @apply p-5;
  }
}
</style>
