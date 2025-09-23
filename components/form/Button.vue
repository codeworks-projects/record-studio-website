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
      bordered: type === 'bordered',
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
    <span v-if="type === 'primary' || type === 'bordered'" class="pl-2">
      <Icon name="freccia" />
    </span>
    <Loader
      v-if="loading"
      class="loader-ct"
      :colorscheme="type === 'secondary' ? 'colored' : 'white'"
    />
  </Motion>
</template>

<script lang="ts" setup>
import { SLIDE_UP, TRANSITION } from '~/animations.config.json'

export type ButtonType = 'primary' | 'secondary' | 'bordered'

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
  @apply relative  min-h-[40px] inline-block px-6 text-base font-bold select-none !leading-none py-2;

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
    @apply text-white rounded-md uppercase !font-medium;
    background: radial-gradient(ellipse 100% 80px at center 60px, white 0%, black 70%);

    /* &:hover {
      @apply bg-white/80;
    } */
  }

  &.secondary {
    @apply bg-white text-black;
  }

  &.bordered {
    @apply text-white !border-[1px] border-white rounded-md uppercase !font-medium bg-transparent;
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
