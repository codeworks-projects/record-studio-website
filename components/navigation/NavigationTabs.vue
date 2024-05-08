<template>
  <div :class="{ nav: true, 'full-screen': fullScreen }">
    <div ref="scrollContainer" class="items">
      <div
        v-for="item in items"
        :key="item.id"
        :class="{ item: true, clickable: true, current: curItem === item.id }"
        @click="clickedItem($event, item)"
      >
        <div class="label">{{ item.name }}</div>
        <div class="i-line" />
      </div>
    </div>
    <div class="line" />
  </div>
</template>

<script lang="ts" setup>
type MenuItem = {
  id: string
  name: string
}

// Props
type Props = {
  curItem: string
  items: Array<MenuItem>
  fullScreen?: boolean
}

withDefaults(defineProps<Props>(), {
  fullScreen: false,
})

// Emit
const emit = defineEmits(['choose'])

// Data
const scrollContainer = ref()

// Methods
const clickedItem = (evt: MouseEvent, item: MenuItem) => {
  emit('choose', item.id)
  centerScrollToElement(evt.target as HTMLElement)
}

const centerScrollToElement = (element: HTMLElement) => {
  const scrollTo =
    element.offsetLeft - scrollContainer.value.offsetWidth / 2 + element.offsetWidth / 2
  scrollContainer.value.scrollLeft = scrollTo
}
</script>

<style lang="postcss" scoped>
.nav {
  @apply relative overflow-hidden mb-5;

  height: 50px;

  & .items {
    @apply relative overflow-auto z-10;

    height: 50px;
    white-space: nowrap;
    -ms-overflow-style: none;
    scrollbar-width: none;
    scroll-behavior: smooth;

    & .item {
      @apply relative inline-block text-lg  mr-8 overflow-visible select-none;

      color: #707070;
      & .label {
        @apply pointer-events-none font-semibold;

        height: 48px;
        line-height: 48px;
      }

      & .i-line {
        @apply pointer-events-none;

        height: 3px;
        transform: scale(0, 1);
        transition:
          background-color 0.3s ease,
          transform 0.3s ease;
      }

      &.current {
        & .label {
          @apply text-primary;
        }

        & .i-line {
          @apply absolute bg-primary  w-full bottom-0;

          transform: scale(1, 1);
        }
      }

      &:last-child {
        @apply mr-0;
      }
    }

    &::-webkit-scrollbar {
      @apply hidden;
    }
  }

  & .line {
    @apply absolute  w-full;

    bottom: 2px;
    height: 3px;
    background-color: #f0f0f0;
  }
}

@media only screen and (max-width: 980px) {
  .nav {
    height: 37px;
    & .items {
      height: 37px;
      & .item {
        @apply text-sm;
        & .label {
          height: 35px;
          line-height: 35px;
        }
      }
    }
    &.full-screen {
      & .items {
        & .item:last-child {
          @apply mr-4;
        }
      }
    }

    & .line {
      @apply w-auto;

      right: 0;
      left: 0;
    }
  }
}
</style>
