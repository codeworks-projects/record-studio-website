<template>
  <div :class="{ 'loader-ct': true, colored: colorscheme === 'colored' }">
    <div class="lds-ellipsis">
      <div></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
type Props = {
  colorscheme: 'white' | 'colored'
}

withDefaults(defineProps<Props>(), {
  colorscheme: 'white',
})
</script>

<style lang="postcss" scoped>
@keyframes loading {
  0% {
    opacity: 0;
    transform: scale(0.7);
  }

  20% {
    opacity: 1;
  }

  100% {
    opacity: 0;
    transform: scale(1);
  }
}

.loader-ct {
  @apply absolute w-full h-full top-0 left-0;

  & > .lds-ellipsis {
    @apply absolute;

    width: 30px;
    height: 30px;
    top: calc(50% - 15px);
    left: calc(50% - 15px);

    & > div {
      @apply absolute border-white border-2;

      width: 100%;
      height: 100%;
      border-radius: 50%;
      animation: loading 2s infinite;
    }
  }

  &.colored {
    & > .lds-ellipsis {
      & > div {
        @apply border-primary;
      }
    }
  }
}
</style>
