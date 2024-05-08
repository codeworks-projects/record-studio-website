<template>
  <div>
    <InputLabel v-if="label" :text="label" :required="required" text-grey />
    <div
      class="autocomplete-ct"
      :class="{
        secondary: colorscheme === InputColorscheme.secondary,
        disabled,
      }"
    >
      <input
        ref="input"
        :placeholder="placeholder"
        :name="name"
        :value="modelValue"
        :required="required"
        :disabled="disabled"
        @keyup.enter="onEnter()"
        @input="onInput(($event.target as HTMLInputElement).value)"
        @blur="onBlur(($event.target as HTMLInputElement).value)"
        @focus="onFocus(($event.target as HTMLInputElement).value)"
      />

      <div
        class="options-list"
        :class="{ visible: areOptionsVisible && !hideOptions }"
      >
        <span
          v-for="option in filteredOptions"
          :key="option.value"
          class="option"
          @mousedown="setSelectedOption(option)"
          >{{ option.name }}</span
        >
        <span
          v-if="!filteredOptions?.length && !isTagAddable"
          class="option no-result"
          >{{ $t("common.noResultFound") }}</span
        >
      </div>
      <div v-show="selectedTags?.length" class="tags-ct">
        <div v-for="(tag, i) in selectedTags" :key="tag" class="tag">
          {{ getTagName(tag) }}
          <div @click="onRemoveTag(tag, i)">
            <Icon name="cross" class="close" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { InputColorscheme, InputAspects } from "@/types/inputs";

type Props = {
  label?: string;
  placeholder?: string;
  name?: string;
  modelValue?: string;
  options?: NameValue[];
  selectedTags?: string[];
  colorscheme?: InputColorscheme;
  aspect?: InputAspects;
  isTagInput?: boolean;
  isTagAddable?: boolean;
  disabled?: boolean;
  required?: boolean;
  valid?: boolean;
}

const props = withDefaults(
  defineProps<Props>(),
  {
    label: "",
    placeholder: "",
    name: "",
    modelValue: "",
    aspect: InputAspects.default,
    colorscheme: InputColorscheme.primary,
    isTagInput: false,
    isTagAddable: false,
    disabled: false,
    required: false,
    valid: true,
  }
);

const emit = defineEmits([
  "input",
  "blur",
  "enter",
  "select",
  "addTag",
  "removeTag",
  "update:modelValue",
]);

// Data
const areOptionsVisible = ref(false);
const input = ref({} as HTMLInputElement);

// Computed
const hideOptions = computed(() => {
  if (props.isTagAddable && !filteredOptions.value.length) {
    return true;
  }

  return false;
});

const filteredOptions = computed(() => {
  return availableOptions.value?.filter(
    (item) =>
      item?.name?.toLowerCase()?.includes(props.modelValue?.toLowerCase()) &&
      item &&
      item?.name
  );
});

const availableOptions = computed(() => {
  return (
    props.options?.filter(
      (item: NameValue) => !props.selectedTags?.includes(item?.value as string)
    ) || []
  );
});

// Watchers

// Methods
const setSelectedOption = (option: NameValue) => {
  if (props.isTagInput) {
    onAddTag(option.value);
  } else {
    input.value.value = option.name;
  }

  areOptionsVisible.value = false;

  onSelect(option.value);
};

const onInput = (value: string) => {
  emit("update:modelValue", value);
  emit("input", value);
};

const onBlur = async (value: string) => {
  emit("blur", value);

  await sleep(100);

  areOptionsVisible.value = false;
};

const onFocus = (value: string) => {
  areOptionsVisible.value = true;
  emit("blur", value);
};

const onEnter = () => {
  emit("enter");
};

const onSelect = (value: string | number) => {
  emit("select", value);
};

const onRemoveTag = (value: string | number, index: number) => {
  emit("removeTag", value, index);
};

const onAddTag = (value: string | number) => {
  emit("addTag", value);
};

const getTagName = (value: string | number) => {
  return props.options?.find((item) => item?.value === value)?.name || "-";
};
</script>

<style lang="postcss" scoped>
.autocomplete-ct {
  @apply relative bg-input
  rounded-md
  px-5;

  &.disabled {
    @apply pointer-events-none opacity-50;
  }

  &.secondary {
    @apply bg-secondary border-secondary
  border-2 rounded-2xl;

    & input {
      @apply text-secondary;

      &::placeholder {
        @apply text-secondary;
      }
    }

    & .options-list {
      @apply bg-secondary-light;

      & > .option {
        &:not(:last-child) {
          @apply border-primary-light;
        }

        &:not(.no-result):hover {
          @apply bg-secondary;
        }
      }
    }

    & .tags-ct {
      & .tag {
        @apply bg-secondary;
      }
    }
  }

  & input {
    @apply bg-transparent outline-none text-black resize-none
    w-full h-input;

    padding-top: 6px;
    padding-bottom: 6px;

    &::placeholder {
      @apply text-grey;
    }

    &:focus {
      @apply outline-none bg-transparent;
    }
  }

  & .options-list {
    @apply absolute z-10 w-full max-h-48 overflow-y-auto
      flex flex-col rounded-md bg-input-focus opacity-0 pointer-events-none transition-all
      text-black
      left-0 right-0;

    &.visible {
      @apply opacity-100 pointer-events-auto;
    }

    & > .option {
      @apply py-2 px-4 text-sm;

      &:not(:last-child) {
        @apply border-b border-light-grey;
      }

      &:not(.no-result):hover {
        @apply bg-light-grey cursor-pointer;
      }

      &.no-result {
        @apply cursor-default;
      }
    }
  }

  & .tags-ct {
    @apply w-full flex flex-wrap gap-3 py-3;

    & .tag {
      @apply bg-primary rounded-lg py-1 pl-3 px-1 text-xs text-white flex gap-1 items-center;

      & .close {
        @apply fill-white h-5 w-5 cursor-pointer;

        &:hover {
          @apply opacity-70;
        }
      }
    }
  }
}
</style>
