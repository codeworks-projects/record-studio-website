<template>
  <client-only>
    <notifications
      group="main"
      position="top center"
      classes="notification"
      width="100%"
    />
  </client-only>
</template>

<style lang="postcss">
.notification {
  @apply text-white px-6 py-4 text-base text-center rounded-xl;

  margin: 15px auto 5px auto;
  background: #44a4fc;
  min-width: 500px;
  max-width: 600px;

  & .notification-content {
    @apply text-center;
  }

  &.warn {
    background: #ffb648;
  }

  &.error {
    background: #e54d42;
  }

  &.success {
    background: #68cd86;
  }
}

@media only screen and (max-width: 980px) {
  .notification {
    @apply mx-5 min-w-0;
  }
}
</style>
