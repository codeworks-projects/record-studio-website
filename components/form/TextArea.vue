<template>
  <div
    :class="{
      textarea: true,
      disabled,
      fill: aspect === 'fill',
      'not-valid': !valid,
    }"
  >
    <InputLabel v-if="label" :text="label" :required="required" />
    <textarea
      ref="inputRef"
      :placeholder="placeholder"
      :value="model"
      :required="required"
      :disabled="disabled"
      @keypress="keypress($event)"
      @input="updateValue(($event.target as HTMLInputElement).value)"
      @blur="onBlur(($event.target as HTMLInputElement).value)"
    ></textarea>
    <InputDescription v-if="description" :text="description" />
  </div>
</template>

<script lang="ts" setup>
type Props = {
  label?: string
  placeholder?: string
  aspect?: 'default' | 'fill'
  description?: string
  required?: boolean
  disabled?: boolean
  valid?: boolean
}

const emit = defineEmits(['blur', 'onEnter'])
withDefaults(defineProps<Props>(), {
  aspect: 'default',
  valid: true,
})
const model = defineModel<string | number>()

const inputRef = ref()

function focus() {
  if (inputRef.value) {
    inputRef.value.focus()
  }
}

function onBlur(value: string) {
  emit('blur', value)
}

function keypress(event: KeyboardEvent) {
  switch (event.code) {
    case 'Enter':
      emit('onEnter')
      break
  }
}

function updateValue(value: string) {
  model.value = value
}
</script>

<style lang="postcss" scoped>
.textarea {
  & textarea {
    @apply text-base py-3 px-5 bg-input resize-none font-semibold align-top text-black rounded-md;

    width: 300px;
    min-height: 150px;

    &:focus {
      @apply outline-none bg-input-focus;
    }
  }

  &.fill {
    & textarea {
      @apply w-full;
    }
  }

  &.not-valid {
    & input {
      @apply bg-red;
    }
  }

  &.disabled {
    @apply pointer-events-none opacity-50;
  }
}

@media only screen and (max-width: 980px) {
  .textarea {
    & textarea {
      @apply w-full;
    }
  }
}
</style>
