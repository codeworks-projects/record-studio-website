<template>
  <div
    :class="{
      modal: true,
      visible: isVisible,
    }"
  >
    <div class="bg" />
    <div
      :class="{
        box: true,
        'show-from-bottom': true,
        'auto-height': autoHeight,
        'has-footer': hasFooter,
      }"
      :style="boxStyle"
    >
      <div class="header">
        <h2 class="title">
          <nuxt-link v-if="titleTo" :to="titleTo" class="clickable text">{{ title }}</nuxt-link>
          <span v-else>{{ title }}</span>
        </h2>
        <div v-if="closable" class="close clickable" @click="close">
          <Icon name="x-mark" />
        </div>
      </div>

      <div class="content-ct">
        <div class="content">
          <slot></slot>
        </div>
      </div>

      <div v-if="hasFooter" class="footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
type Props = {
  isVisible?: boolean
  title?: string
  titleTo?: string
  width?: number
  height?: number
  autoHeight?: boolean
  hasFooter?: boolean
  closable?: boolean
  styleDimensionUnit?: 'px' | 'rem' | '%'
}

const emit = defineEmits(['close'])
const props = withDefaults(defineProps<Props>(), {
  width: 0,
  height: 0,
  closable: true,
  styleDimensionUnit: 'px',
})

const boxStyle = computed(
  () =>
    (props.autoHeight
      ? 'height:auto;'
      : props.height
        ? 'height:' + props.height + props.styleDimensionUnit + ';'
        : '') + (props.width ? 'width:' + props.width + props.styleDimensionUnit + ';' : '')
)

function close() {
  emit('close')
}
</script>

<style lang="postcss" scoped>
.modal {
  @apply fixed top-0 left-0 w-full h-full flex items-center justify-center opacity-0 pointer-events-none transition-opacity duration-200 z-30;

  transition-timing-function: ease;

  & .bg {
    @apply absolute top-0 right-0 bottom-0 left-0;

    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(10px);
  }

  & .box {
    @apply bg-white rounded-xl overflow-hidden;

    width: 500px;
    height: 500px;
    box-shadow: 0 0 150px rgba(0, 0, 0, 0.1);

    &.show-from-bottom {
      @apply duration-500 opacity-0;

      transform: translateY(50px);
      transition-property: transform, opacity;
    }

    &.has-footer {
      @apply pb-16;
    }

    & .header {
      @apply flex items-center justify-between gap-x-4 px-6 pt-5 mb-3;

      & .close {
        @apply flex items-center justify-center transition-opacity cursor-pointer bg-secondary text-center;

        width: 35px;
        height: 35px;
        border-radius: 50%;

        & svg {
          @apply align-top;

          width: 20px;
          height: 20px;
          fill: #444;
        }

        &:hover {
          @apply bg-secondary-hover;
        }
      }

      & .title {
        @apply text-3xl truncate font-bold;
      }
    }

    & .content-ct {
      @apply relative;

      height: calc(100% - 68px);
    }

    & .content {
      @apply h-full overflow-y-auto px-6 overflow-x-hidden;
    }

    &.auto-height {
      & .content {
        @apply h-auto;
      }
    }

    & .footer {
      @apply flex items-center justify-center absolute bottom-4 left-4;
    }
  }

  &.visible {
    @apply opacity-100 pointer-events-auto;

    & .box {
      &.show-from-bottom {
        @apply opacity-100;

        transform: translateY(0);
      }
    }
  }
}

@media only screen and (max-width: 980px) {
  .modal {
    & .box {
      @apply absolute top-5 left-5 right-5 bottom-5;

      width: auto !important;
      height: auto !important;
    }
  }
}
</style>
