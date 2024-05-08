<template>
  <FileUploader
    :media-type="MediaType.IMAGE"
    accept="image/*"
    @file-upload="onFileUpload"
    @loading="onLoading"
  >
    <div
      class="image-input"
      :class="{
        'light-grey-fill': fill === 'grey',
        'white-fill': fill === 'white',
        'is-behind-component': isBehindComponent,
      }"
      :style="{
        backgroundImage:
          imageBackground && !isBehindComponent
            ? 'url(' + imageBackground + ')'
            : undefined,
        width: previewWidth + 'px',
        height: previewHeight + 'px',
      }"
    >
      <div v-if="!isBehindComponent" class="upload-circle">
        <div class="ico">
          <Icon name="camera" />
        </div>
      </div>
    </div>
  </FileUploader>
</template>

<script lang="ts" setup>
import { MediaType } from "@/types/enums";

type Props = {
  curImage?: string,
  previewWidth?: number,
  previewHeight?: number,
  maxWidth?: number,
  maxHeight?: number,
  fill?: "white" | "grey",
  whiteFill?: string,
  isBehindComponent?: boolean
}

const emit = defineEmits(['fileUpload'])
const props = withDefaults(defineProps<Props>(), {
  previewWidth: 120,
  previewHeight: 120,
  maxWidth: 1000,
  maxHeight: 1000,
})

const imageBase64Data = ref()
const isLoading = ref(false)
const imageBackground = computed(() => imageBase64Data.value || props.curImage)

watch(() => props.curImage, () => imageBase64Data.value = "")

function onFileUpload(mediaFile) {
  console.log(mediaFile)
  emit("fileUpload", mediaFile);
}

function onLoading(value: boolean) {
  isLoading.value = value;
}
</script>

<style lang="postcss" scoped>
.image-input {
  @apply flex items-center justify-center
  cursor-pointer
  rounded-full bg-placeholder bg-center bg-cover;

  & .upload-circle {
    @apply w-12 h-12;

    & .ico {
      @apply flex h-full items-center justify-center;

      & svg {
        @apply text-white fill-current w-8 h-8;
      }
    }
  }

  &.is-behind-component {
    @apply bg-transparent w-full h-full absolute;
  }

  & input {
    @apply absolute w-full h-full opacity-0 cursor-pointer z-30;
  }

  &.light-grey-fill {
    background-color: #f7f7f7;
  }

  &.white-fill {
    background-color: #fff;
  }
}
</style>
