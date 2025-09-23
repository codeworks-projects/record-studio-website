<template>
  <div :class="{ disabled }">
    <InputLabel v-if="title && type === 'switch-on'" :text="title" />
    <div
      class="flex items-center"
      :class="{
        checkbox: true,
        'switch-on': type === 'switch-on',
        __clickable: type === 'switch-on',
        checked,
        black,
      }"
      @click="clickInput"
    >
      <div class="input">
        <input
          ref="inputRef"
          :class="{ black }"
          v-model="checked"
          type="checkbox"
          :disabled="disabled"
          @click.stop="null"
        />
        <icon name="check" />
      </div>
      <label class="font-bold" :class="{ black }" v-html="label || ''" />
    </div>
  </div>
</template>

<script lang="ts" setup>
export type CheckboxTypes = 'checkbox' | 'switch-on'

type Props = {
  label?: string
  title?: string
  disabled?: boolean
  black?: boolean
  type?: CheckboxTypes
}

withDefaults(defineProps<Props>(), {
  disabled: false,
  type: 'checkbox',
})
const checked = defineModel<boolean>()
const inputRef = ref()

function clickInput() {
  if (inputRef.value) {
    inputRef.value.click()
  }
}
</script>

<style lang="postcss" scoped>
.checkbox {
  @apply relative inline-flex max-w-xs select-none items-start gap-1 text-white;

  &.black {
    @apply max-w-none text-black;
  }

  & > .input {
    @apply relative mr-2 inline-block flex-shrink-0 text-center;

    width: 16px;
    height: 16px;

    & > input {
      @apply absolute left-0 top-0 h-full w-full cursor-pointer rounded-sm border-white bg-transparent align-top;

      &.black {
        @apply border-black;
      }

      transition: background 0.2s ease;
      -webkit-appearance: none;
      border-width: 1px;

      &:focus {
        @apply outline-none;
      }

      &:checked {
        @apply bg-white !important;
      }
    }

    & > svg {
      @apply pointer-events-none relative inline-block align-top opacity-0;

      margin-top: 1px;
      width: 14px;
      height: 14px;
      fill: #000;
      transition:
        opacity 0.2s ease,
        transform 0.2s ease;
      transform: scale(0.5);
    }
  }

  & > label {
    @apply inline-block cursor-pointer align-top text-sm leading-tight text-white;

    &.black {
      @apply text-black;
    }
  }

  &.checked {
    & > .input {
      & > svg {
        @apply opacity-100;

        transform: scale(1);
      }
    }
  }

  &.switch-on {
    @apply h-input rounded-lg bg-input px-6;

    min-width: 225px;

    & > .input {
      margin-top: 8px;
    }

    & label {
      margin-top: 13px;
    }
  }

  &.disabled {
    @apply pointer-events-none opacity-50;
  }
}
</style>
