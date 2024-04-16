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
        'show-from-top': true,
      }"
    >
      <div class="header">
        <h2 class="title">
          {{ title }}
        </h2>
      </div>
      <div class="main">
        <div v-if="iconName" class="icon-ct">
          <Icon :name="iconName" class="icon" />
        </div>
        <div class="content">
          {{ value }}
        </div>
      </div>
      <div class="footer">
        <div class="btn-ct">
          <Button
            :value="$t(secondaryLabel)"
            :type="secondaryButtonType"
            :disabled="isLoading"
            @click="cancel()"
          />
          <Button
            :value="$t(primaryLabel)"
            :type="primaryButtonType"
            :loading="isLoading"
            @click="confirm()"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ButtonType } from '../form/Button.vue'

type Props = {
  isVisible?: boolean
  isLoading?: boolean
  title?: string
  value?: string
  primaryLabel?: string
  secondaryLabel?: string
  primaryButtonType?: ButtonType
  secondaryButtonType?: ButtonType
  iconName?: string
}

withDefaults(defineProps<Props>(), {
  secondaryLabel: 'common.cancel',
  primaryLabel: 'common.continue',
  primaryButtonType: 'primary',
  secondaryButtonType: 'secondary',
  // FIXME: Change all secondary action colors for buttons
  // secondaryButtonType: "primary-outline",
  iconName: undefined,
})

const emit = defineEmits(['cancel', 'confirm'])
const cancel = () => emit('cancel')
const confirm = () => emit('confirm')
</script>

<style lang="postcss" scoped>
.modal {
  @apply fixed top-0 left-0 w-full h-full flex justify-center items-center opacity-0 pointer-events-none transition-opacity duration-200 z-30;

  transition-timing-function: ease;

  & .bg {
    @apply absolute top-0 right-0 bottom-0 left-0;

    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(10px);
  }

  & .box {
    @apply bg-white rounded-3xl overflow-hidden p-5 text-primary;

    width: 500px;
    height: fit-content;
    box-shadow: 0 0 150px rgba(0, 0, 0, 0.1);

    &.show-from-top {
      @apply duration-500 opacity-0;

      transform: translateY(50px);
      transition-property: transform, opacity;
    }

    & .header {
      @apply flex items-center justify-between gap-x-4 px-3 py-4;

      & .title {
        @apply text-xl truncate font-bold;
      }
    }

    & .main {
      @apply flex gap-3 px-4 py-6;
      & .icon-ct {
        & .icon {
          @apply w-4 h-4;
        }
      }

      & .content {
        @apply text-grey;
      }
    }

    & .footer {
      @apply flex justify-end items-center;
      min-height: 75px;

      & .btn-ct {
        @apply flex gap-3 mr-2;
      }
    }

    &.inverted-color-scheme {
      & .main {
        @apply bg-secondary;
      }
    }
  }

  &.visible {
    @apply opacity-100 pointer-events-auto;

    & .box {
      &.show-from-top {
        @apply opacity-100;

        transform: translateY(0);
      }
    }
  }
}

@media only screen and (max-width: 980px) {
  .modal {
    & .box {
      @apply absolute;

      &:not(.keep-height-inline-style) {
        @apply my-auto overflow-y-auto !important;

        top: 15px;
        bottom: 15px;
      }

      &:not(.keep-width-inline-style) {
        @apply w-auto mx-0 !important;

        right: 15px;
        left: 15px;
      }
    }
  }
}
</style>
