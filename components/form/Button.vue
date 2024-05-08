<template>
  <Motion
    tag="button"
    :initial="animated ? SLIDE_UP.INITIAL : undefined"
    :in-view="animated ? SLIDE_UP.IN_VIEW : undefined"
    :transition="animated ? TRANSITION.DEFAULT : undefined"
    :class="{
      button: true,
      clickable: true,
      loading,
      primary: type === 'primary',
      secondary: type === 'secondary',
      disabled,
      'ico-only': value === undefined,
      'fill-width': aspect === 'fill',
      small: size === 'sm',
    }"
  >
    <div v-if="iconName" class="svg-ct">
      <div class="inner">
        <icon :name="iconName" :type="iconType" />
      </div>
    </div>
    {{ value }}
    <Loader
      v-if="loading"
      class="loader-ct"
      :colorscheme="type === 'secondary' ? 'colored' : 'white'"
    />
  </Motion>
</template>

<script lang="ts" setup>
import { SLIDE_UP, TRANSITION } from '~/animations.config.json'

export type ButtonType = 'primary' | 'secondary'

type Props = {
  value?: string
  icon?: string
  size?: 'default' | 'sm'
  aspect?: 'default' | 'fill'
  type?: ButtonType
  disabled?: boolean
  loading?: boolean
  iconName?: string
  animated?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  size: 'default',
  aspect: 'default',
  type: 'primary',
  animated: true,
})

const iconType = computed(() => (props.type === 'primary' ? 'primary' : 'secondary'))
</script>

<style lang="postcss" scoped>
.button {
  @apply relative h-input inline-block px-6 text-base font-bold select-none;

  min-width: 50px;
  line-height: 42px;

  & .svg-ct {
    @apply inline-block h-full mr-2 align-top;

    & .inner {
      @apply flex items-center h-full;

      & > svg {
        width: 18px;
        height: 18px;
        fill: theme(colors.white);
      }
    }
  }

  & > .loader-ct {
    border-radius: inherit;
    background-color: inherit;
  }

  &.primary {
    @apply bg-white text-black;

    /* &:hover {
      @apply bg-white/80;
    } */
  }

  &.secondary {
    @apply bg-secondary text-black;

    &:hover {
      @apply bg-secondary-hover;
    }

    & .svg-ct {
      & .inner {
        & > svg {
          fill: theme(colors.black);
        }
      }
    }
  }

  &.ico-only {
    @apply px-0 text-center;
    & .svg-ct {
      @apply mr-0;
    }
  }

  &.loading {
    @apply pointer-events-none;

    cursor: progress;
  }

  &.disabled {
    @apply pointer-events-none opacity-50;
  }

  &.fill-width {
    @apply block text-center;
  }

  &.small {
    @apply w-10 h-10 min-w-0;

    & .svg-ct {
      & .inner {
        & > svg {
          @apply h-4;
        }
      }
    }
  }
}
</style>
