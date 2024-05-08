<template>
  <div
    :class="{
      'text-input': true,
      disabled,
      fill: aspect === 'fill',
      'not-valid': !valid,
    }"
  >
    <InputLabel v-if="label" :text="label" :required="required" />
    <input
      ref="inputRef"
      :type="type"
      :placeholder="placeholder"
      :name="name"
      v-model="model"
      :required="required"
      :disabled="disabled"
      :autocomplete="autocomplete"
      @keypress="keypress($event)"
      @blur="onBlur(($event.target as HTMLInputElement).value)"
    />
    <InputDescription v-if="description" :text="description" />
    <div v-if="type === 'search'" class="search-ico">
      <Icon name="magnifying-glass" />
    </div>
  </div>
</template>

<script lang="ts" setup>
type Props = {
  label?: string
  placeholder?: string
  type?: 'text' | 'number' | 'tel' | 'email' | 'search' | 'password' | 'hidden'
  aspect?: 'default' | 'fill'
  name?: string
  description?: string
  required?: boolean
  disabled?: boolean
  valid?: boolean
  autocomplete?: 'off' | 'new-password'
}

const emit = defineEmits(['blur', 'onEnter'])
withDefaults(defineProps<Props>(), {
  type: 'text',
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
</script>

<style lang="postcss" scoped>
.text-input {
  @apply relative;

  & input {
    @apply h-input text-base px-5 bg-input resize-none text-black font-medium rounded-md;

    width: 300px;
    padding-top: 10px;
    padding-bottom: 10px;

    &:focus {
      @apply outline-none bg-input-focus;
    }

    &[type='search'] {
      padding-right: 50px;
    }
  }

  & .search-ico {
    @apply flex items-center justify-center absolute top-0 bottom-0 right-0;

    & svg {
      @apply w-6 h-6 text-grey fill-current;
    }

    width: 50px;
  }

  &.fill {
    & input {
      @apply w-full;
    }
  }

  &.not-valid {
    & input {
      @apply border-[1px] border-red;
    }
  }

  &.disabled {
    @apply pointer-events-none opacity-50;
  }
}

@media only screen and (max-width: 980px) {
  .text-input {
    & input {
      @apply w-full;
    }
  }
}
</style>
