<template>
  <div class="no-results">
    <Icon class="icon" :name="icon" />
    <p class="title">{{ title }}</p>
    <p v-if="description" class="desc">{{ description }}</p>
    <component :is="button?.path ? NuxtLink : 'div'" :to="localePath(button?.path || '')">
      <Button v-if="button?.label" class="btn" :value="button?.label" @click="onButtonClick" />
    </component>
  </div>
</template>

<script lang="ts" setup>
const NuxtLink = resolveComponent('nuxt-link')
const localePath = useLocalePath()

type NoResultButtonProp = {
  path?: string
  label?: string
}

type Props = {
  title: string
  icon?: string
  description?: string
  button?: NoResultButtonProp
}

const emit = defineEmits(['buttonClick'])
withDefaults(defineProps<Props>(), {
  title: undefined,
  icon: 'magnifying-glass-circle',
  description: undefined,
  button: () => ({
    path: undefined,
    label: undefined,
  }),
})

const onButtonClick = () => {
  emit('buttonClick')
}
</script>

<style lang="postcss" scoped>
.no-results {
  @apply flex flex-col items-center justify-center py-10 px-10;

  & .icon {
    @apply h-20 w-20 fill-primary mb-4;
  }

  & .title {
    @apply text-primary text-xl font-bold;
  }

  & .desc {
    @apply text-black text-center;

    max-width: 400px;
  }

  & .btn {
    @apply mt-10;
  }
}
</style>
