<template>
  <main class="login-view">
    <Image :src="backgroundImage" class="background-img" />
    <div class="box">
      <Icon name="broken-image" class="logo" />
      <h1>{{ title }}</h1>
      <slot></slot>
    </div>
  </main>
</template>

<script lang="ts" setup>
type Props = {
  title: string
  backgroundImage?: string
}

withDefaults(defineProps<Props>(), {
  title: undefined,
  backgroundImage: '/image/login-background.png',
})
</script>

<style lang="postcss" scoped>
.login-view {
  @apply relative flex items-center justify-center h-screen bg-placeholder;

  & .background-img {
    @apply absolute w-full h-full;
  }

  & .box {
    @apply relative rounded-2xl bg-white shadow-lg px-5 py-6;

    width: 340px;

    & .logo {
      @apply w-32 fill-primary mb-7;
    }

    h1 {
      @apply text-2xl font-semibold;
    }
  }
}

@media only screen and (max-width: 980px) {
  .login-view {
    & .box {
      @apply flex-grow w-auto mx-8;
    }
  }
}
</style>
