<template>
  <div :class="{ disabled }">
    <InputLabel v-if="title && type === 'switch-on'" :text="title" />
    <div
      :class="{
        checkbox: true,
        'switch-on': type === 'switch-on',
        clickable: type === 'switch-on',
        checked,
      }"
      @click="clickInput"
    >
      <div class="input">
        <input
          ref="inputRef"
          v-model="checked"
          type="checkbox"
          :disabled="disabled"
          @click.stop="null"
        />
        <icon name="check" />
      </div>
      <label>
        {{ label }}
      </label>
    </div>
  </div>
</template>

<script lang="ts" setup>
type Props = {
  label?: string
  title?: string
  disabled?: boolean
  type?: 'checkbox' | 'switch-on'
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
  @apply relative inline-block text-black select-none;

  & > .input {
    @apply relative inline-block mr-2 text-center;

    width: 24px;
    height: 24px;

    & > input {
      @apply absolute w-full h-full left-0 top-0 rounded-md align-top cursor-pointer bg-input border-primary;

      transition: background 0.2s ease;
      -webkit-appearance: none;
      border-width: 3px;

      &:focus {
        @apply outline-none;
      }

      &:checked {
        @apply bg-primary !important;
      }
    }

    & > svg {
      @apply relative inline-block pointer-events-none opacity-0 align-top;

      margin-top: 5px;
      width: 14px;
      height: 14px;
      fill: #fff;
      transition:
        opacity 0.2s ease,
        transform 0.2s ease;
      transform: scale(0.5);
    }
  }

  & > label {
    @apply inline-block text-black text-sm leading-tight font-semibold align-top cursor-pointer;

    margin-top: 0.35rem;
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
    @apply px-6 rounded-lg bg-input h-input;

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
