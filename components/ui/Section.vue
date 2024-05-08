<template>
  <section
    :class="{
      'spacing-small': !verticalSpacing,
      'spacing-medium': verticalSpacing === 'large',
      'spacing-large': verticalSpacing === 'extra-large',
    }"
  >
    <div
      :class="{
        center,
      }"
    >
      <slot />
    </div>
    <slot name="after-content" />
  </section>
</template>

<script lang="ts" setup>
type Props = {
  verticalSpacing?: undefined | 'large' | 'extra-large'
  center?: boolean
}

withDefaults(defineProps<Props>(), {
  verticalSpacing: undefined,
  center: false,
})
</script>

<style lang="postcss" scoped>
.spacing-small {
  @apply py-8;
}

.spacing-medium {
  @apply py-14;
}

.spacing-large {
  @apply py-16;
}

@media only screen and (max-width: 980px) {
  .spacing-small {
    @apply py-4;
  }

  .spacing-medium {
    @apply py-8;
  }

  .spacing-large {
    @apply py-10;
  }
}
</style>
