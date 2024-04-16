<template>
  <component
    :is="toPath ? NuxtLink : 'div'"
    :to="toPath"
    :class="{
      'record-card': true,
      clickable: true,
      placeholder: data?.isPlaceholder,
    }"
  >
    <div v-if="data?.imageUrl || data?.isPlaceholder" class="image-ct">
      <div
        class="image"
        :style="{
          backgroundImage: data?.imageUrl ? 'url(' + data?.imageUrl + ')' : undefined,
        }"
      />
    </div>
    <div class="name">{{ data?.name }}</div>
    <div v-if="buttonIcon" class="button-ct">
      <Button :type="buttonType" size="sm" :icon="buttonIcon" :disabled="data?.isPlaceholder" />
    </div>
  </component>
</template>

<script setup lang="ts">
import { ButtonTypes } from '@/types/inputs'

const NuxtLink = resolveComponent('nuxt-link')

type Props = {
  data: ListRecord
  toPath?: string
  buttonIcon?: string
  buttonType?: ButtonTypes
}

withDefaults(defineProps<Props>(), {
  data: undefined,
  toPath: undefined,
  buttonIcon: undefined,
  buttonType: ButtonTypes.primary,
})
</script>

<style lang="postcss" scoped>
.record-card {
  @apply flex items-center px-3 py-3 gap-3 border-b border-white-contrast select-none;

  & .image-ct {
    @apply flex items-center justify-center;

    & .image {
      @apply w-10 h-10 bg-placeholder bg-cover bg-center rounded-md;
    }
  }

  & .name {
    @apply text-base font-semibold text-primary flex-grow truncate;
  }

  & .button-ct {
    @apply flex items-center justify-center;
  }

  &:hover {
    @apply bg-[#fcfcfc];
  }

  &.placeholder {
    @apply pointer-events-none;

    & .name {
      @apply h-4 bg-placeholder;
    }
  }
}
</style>
