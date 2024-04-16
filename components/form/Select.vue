<template>
  <div
    class="select"
    :class="{
      disabled,
      fill: aspect === InputAspects.fill,
    }"
  >
    <InputLabel v-if="label" :text="label" :required="required" />
    <div class="selector">
      <select ref="input" :required="required" v-model="model" @blur="blur">
        <option
          v-for="option in options"
          :key="option.value"
          :value="option.value"
          :selected="option.value === model"
        >
          {{ option.name }}
        </option>
      </select>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type SelectOption, InputAspects } from '@/types/inputs'

type Props = {
  label: string
  options: Array<SelectOption>
  aspect?: InputAspects
  disabled?: boolean
  required?: boolean
}

withDefaults(defineProps<Props>(), {
  label: undefined,
  options: () => [],
  aspect: InputAspects.default,
  disabled: false,
  required: false,
})

const model = defineModel()

// Data
const input = ref(null)

// Methods
const emit = defineEmits(['update:modelValue', 'blur'])

const updateValue = (value: String) => {
  emit('update:modelValue', value)
}

const focus = () => {
  if (input.value) {
    ;(input.value as HTMLInputElement).focus()
  }
}

const blur = () => {
  emit('blur')
}
</script>

<style lang="postcss" scoped>
.select {
  & .selector {
    @apply relative h-input inline-block bg-input text-base font-medium cursor-pointer rounded-md;

    & select {
      @apply bg-transparent text-black text-base font-medium pl-5 pr-16 cursor-pointer appearance-none;

      padding-top: 10px;
      padding-bottom: 10px;

      &:focus {
        @apply outline-none;
      }
    }

    &::after {
      @apply absolute float-right top-1/2 bg-no-repeat pointer-events-none;

      content: '';
      background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500"  xmlns:v="https://vecta.io/nano"><path d="M3.6 158.7l3.6-5.2c6.4-9.1 18.9-11.4 28.1-5L250 298.2l214.7-149.6c9.1-6.4 21.7-4.1 28.1 5l3.6 5.2c6.4 9.1 4.1 21.7-5 28.1L250 355.1 8.6 186.8c-9.1-6.4-11.3-18.9-5-28.1z"/></svg>');
      background-size: 16px 16px;
      width: 16px;
      height: 16px;
      padding: 0 12px;
      right: 12px;
      transform: translateY(-50%);
    }
  }

  &.fill {
    & .selector {
      @apply block;

      & select {
        @apply w-full;
      }
    }
  }

  &.disabled {
    @apply pointer-events-none opacity-25;
  }
}
</style>
