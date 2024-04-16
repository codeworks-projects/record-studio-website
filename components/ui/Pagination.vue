<template>
  <div class="pagination-ct" :class="{ placeholder: isLoading }">
    <div class="pagination-wrapper">
      <div
        class="action-ct"
        :class="{
          disabled: (isPrevDisabled && !isLoading) || loadingNewResults,
        }"
        @click="onPrevPage()"
      >
        <div v-if="loadingNewResults && lastAction === 'PREV'" class="loader-new-results">
          <div class="lds-ellipsis">
            <div></div>
          </div>
        </div>
        <Icon v-else name="chevron-left" />
      </div>
      <div
        v-for="page in availablePages"
        :key="page"
        class="page-ct"
        :class="{
          'is-current': page === currentPage,
          disabled: isLoading || loadingNewResults,
        }"
        @click="onPageClick(page)"
      >
        {{ page }}
      </div>
      <div
        class="action-ct"
        :class="{
          disabled: (isNextDisabled && !isLoading) || loadingNewResults,
        }"
        @click="onNextPage()"
      >
        <div v-if="loadingNewResults && lastAction === 'NEXT'" class="loader-new-results">
          <div class="lds-ellipsis">
            <div></div>
          </div>
        </div>
        <Icon v-else name="chevron-right" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
type Props = {
  isLoading?: boolean
  loadingNewResults?: boolean
  currentPage: number
  totalPages: number
  showingPages?: number
}

const props = withDefaults(defineProps<Props>(), {
  isLoading: false,
  loadingNewResults: false,
  showingPages: 5,
})

// Data
const lastAction = ref('')

// Computed
const pagesAsArray = computed(() => {
  return props.totalPages === 1
    ? [1]
    : [...Array(props.totalPages).keys()].map((item) => (item += 1))
})

const availablePages = computed(() => {
  if (props.isLoading) {
    return Array(props.showingPages).fill('...')
  }

  if (props.showingPages >= props.totalPages) {
    return pagesAsArray.value
  }

  if (!isAvailablePagesIncrementEnable.value) {
    const startIndex = props.currentPage - halfAvailablePagesLength.value || 1

    return props.currentPage > props.showingPages + 1
      ? pagesAsArray.value.slice(startIndex, props.showingPages)
      : pagesAsArray.value.slice(0, props.showingPages)
  }

  const startIndex = props.currentPage - halfAvailablePagesLength.value || 1
  const endIndex = startIndex + props.showingPages

  if (endIndex > pagesAsArray.value.length) {
    return pagesAsArray.value.slice(
      pagesAsArray.value.length - props.showingPages,
      pagesAsArray.value.length
    )
  }

  return pagesAsArray.value.slice(startIndex, endIndex)
})

const isAvailablePagesIncrementEnable = computed(() => {
  if (!availablePages.value?.length) {
    return
  }

  const pageAtIndex = pagesAsArray.value.findIndex((item) => item === props.currentPage)

  return pageAtIndex >= halfAvailablePagesLength.value
})

const halfAvailablePagesLength = computed(() => {
  return Math.floor(props.showingPages / 2)
})

const isPrevDisabled = computed(() => {
  return props.currentPage <= 1
})

const isNextDisabled = computed(() => {
  return (
    props.currentPage === pagesAsArray.value.length ||
    props.totalPages === 0 ||
    props.totalPages === 1
  )
})

// Emit
const emit = defineEmits(['nextPage', 'prevPage', 'pageClick'])

const onPageClick = (page: number) => {
  if (page > props.currentPage) {
    lastAction.value = 'NEXT'
  } else {
    lastAction.value = 'PREV'
  }

  emit('pageClick', page)
}

const onNextPage = () => {
  lastAction.value = 'NEXT'
  emit('nextPage')
}

const onPrevPage = () => {
  lastAction.value = 'PREV'
  emit('prevPage')
}
</script>

<style scoped lang="postcss">
.pagination-ct {
  @apply max-w-lg w-full flex items-center;

  &.placeholder {
    @apply opacity-50 pointer-events-none;
  }

  & .pagination-wrapper {
    @apply flex items-center gap-3 transition-all;

    & > div {
      @apply w-8 h-8 rounded-md border
      bg-input
      cursor-pointer
      flex items-center justify-center
      transition-all
      select-none;

      &:hover {
        @apply bg-primary-light;
      }
    }

    & .action-ct {
      @apply relative;

      z-index: 1;

      &.disabled {
        @apply pointer-events-none opacity-50;
      }

      & svg {
        @apply h-5 fill-primary;
      }
    }

    & .page-ct {
      @apply text-primary text-xs font-bold z-0;

      &.is-current {
        @apply bg-primary text-white border-primary;
      }

      &.disabled {
        @apply pointer-events-none opacity-50;
      }
    }
  }
}

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

.loader-new-results {
  @apply w-full h-full flex items-center justify-center;

  & > .lds-ellipsis {
    @apply relative;

    width: 20px;
    height: 20px;

    & > div {
      @apply absolute border-primary border-2;

      width: 100%;
      height: 100%;
      border-radius: 50%;
      animation: loading 2s infinite;
    }
  }
}
</style>
