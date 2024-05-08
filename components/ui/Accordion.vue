<template>
  <div class="accordion" :class="{ open: isOpen }">
    <div class="title-ct" @click="isOpen = !isOpen">
      <div class="title">{{ title }}</div>
      <div v-if="rightIcon" class="icon">
        <Icon :name="rightIcon" />
      </div>
    </div>
    <div class="content" :class="{ open: isOpen }">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
type Props = {
  title: string
  rightIcon?: string
}

withDefaults(defineProps<Props>(), {
  title: '',
  rightIcon: 'chevron-right',
})

const isOpen = ref(false)
</script>

<style lang="postcss" scoped>
.accordion {
  @apply transition-all relative;
  & .title-ct {
    @apply flex items-center justify-between border-b
      py-1
      text-grey
      cursor-pointer;

    & .icon {
      @apply transition-all duration-300;

      transform: rotateZ(90deg);

      & svg {
        @apply h-5 fill-black;
      }
    }
  }

  & .content {
    @apply opacity-0 h-0
       hidden;
  }
  &.open {
    & .icon {
      transform: rotateZ(-90deg);
    }
    & .content {
      @apply opacity-100 h-auto py-4 block;
    }
  }
}
</style>
