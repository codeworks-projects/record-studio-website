<template>
  <div
    :class="{
      disabled: loading,
    }"
    @click="clickFileInput"
  >
    <input
      ref="fileInput"
      type="file"
      :accept="accept"
      hidden
      @change="imageFileChange"
    />
    <slot> </slot>
  </div>
</template>

<script lang="ts" setup>
type Props = {
  mediaType: MediaType;
  accept: string;
  maxWidth?: number;
  maxHeight?: number;
}

const props = withDefaults(defineProps<Props>(), {
  maxWidth: 1000,
  maxHeight: 1000,
});

const { t } = useI18n();

// Data
const fileInput = ref();
const fileName = ref();
const fileValue = ref();
const mimeType = ref();
const fileExtension = ref();

const loading = ref(false);

// Emits
const emit = defineEmits(["fileUpload", "loading"]);

// Watchers
watch(loading, (newValue) => {
  emit("loading", newValue);

  if (!newValue) {
    fileInput.value.value = null;
  }
});

// Methods
const clickFileInput = () => {
  fileInput.value.click();
};

const imageFileChange = (e: any) => {
  loading.value = true;

  let files = e.target.files || e.dataTransfer.files;
  if (!files.length) return;

  const { name, type } = files[0];

  fileValue.value = files[0];
  mimeType.value = type;
  fileExtension.value = type.replace(/(.*)\//g, "");

  fileName.value = name;

  if (props.mediaType === "IMAGE") {
    createImageAndUpload(files[0]);
    return;
  }

  uploadFile();
};

const createImageAndUpload = async (file: any) => {
  // <= this must be asynchronous
  const reader = new FileReader();

  // Wait for the data url to be loaded from the file
  const dataURL = await new Promise((resolve) => {
    reader.onload = (e) => resolve(e?.target?.result);
    reader.readAsDataURL(file);
  });

  // Wait for the image to be loaded
  const img = new Image();
  await new Promise((resolve) => {
    img.onload = resolve;
    img.src = dataURL as string;
  });

  // Resize the image with a canvas
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  const [maxWidth, maxHeight] = [props.maxWidth, props.maxHeight];
  const [imgWidth, imgHeight] = [img.naturalWidth, img.naturalHeight];
  const ratio = Math.min(maxWidth / imgWidth, maxHeight / imgHeight);

  canvas.width = imgWidth * ratio;
  canvas.height = imgHeight * ratio;

  ctx!.drawImage(img, 0, 0, canvas.width, canvas.height);

  fileValue.value = canvas.toDataURL(`${mimeType.value}`, 0.9);

  uploadFile();
};

const uploadFile = async () => {
  const awsUploadLink = await getAWSUploadLink();

  const blobData =
    props.mediaType === "IMAGE" ? getBlobDataOfImage() : fileValue.value;

  const { data, error } = await useFetch(awsUploadLink, {
    method: "PUT",
    body: blobData,
  });

  loading.value = false;

  if (!error.value) {
    const fileUrl = awsUploadLink.split("?")[0];

    emit("fileUpload", {
      extension: fileExtension.value,
      mimeType: mimeType.value,
      mediaType: props.mediaType,
      url: fileUrl,
    });

    return;
  }

  notifyError(t("request.errorOccurredWhileProcessingRequest"));
};

const getBlobDataOfImage = () => {
  let binary = atob(fileValue.value.split(",")[1]);
  let array = [];
  for (let i = 0; i < binary.length; i++) {
    array.push(binary.charCodeAt(i));
  }

  return new Blob([new Uint8Array(array)], { type: mimeType.value });
};
const getAWSUploadLink = (): Promise<string> => {
  return new Promise((resolve) => {
    const query = gql`
      query getAWSUploadURL(
        $fileExtension: String!
        $mediaType: MediaType!
        $contentType: String!
      ) {
        getAWSUploadURL(
          fileExtension: $fileExtension
          mediaType: $mediaType
          contentType: $contentType
        ) {
          url
        }
      }
    `;
    const { onResult } = useQuery(
      query,
      {
        fileExtension: fileExtension.value,
        mediaType: props.mediaType,
        contentType: mimeType.value,
      },
      getApolloRequestOptions()
    );

    onResult(async (result) => {
      resolve(result.data.getAWSUploadURL?.url);
    });
  });
};
</script>

<style scoped lang="postcss">
.disabled {
  @apply opacity-50 pointer-events-none;
}
</style>
