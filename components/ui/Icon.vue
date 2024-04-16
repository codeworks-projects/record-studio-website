<template>
  <component :is="icon" class="fill-current" />
</template>

<script lang="ts" setup>
type Props = {
  name: string
}
const props = defineProps<Props>();

const icon = defineAsyncComponent(() =>
  import(`../../assets/icon/${props.name}.svg`)
);
</script>
