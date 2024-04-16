<template>
  <LoginView :title="t('common.login')" class="login-view">
    <TextInput
      v-model="loginData.email"
      type="email"
      aspect="fill"
      :placeholder="t('common.email') + '...'"
      :disabled="isProcessing"
      required
      class="input"
      @onEnter="doLogin()"
    />
    <TextInput
      v-model="loginData.password"
      type="password"
      aspect="fill"
      :placeholder="t('common.password') + '...'"
      :disabled="isProcessing"
      required
      class="input"
      @onEnter="doLogin()"
    />
    <p class="forgot-password">
      <nuxt-link :to="localePath('/login/recover')" class="clickable">
        {{ t("common.forgotPassword") }}?
      </nuxt-link>
    </p>

    <Button
      class="button"
      :value="t('common.login')"
      :loading="isProcessing"
      @click="doLogin()"
    />

    <p class="go-to-signup">
      <nuxt-link :to="localePath('/signup')" class="clickable">
        {{ t("login.newUserSignup") }} →
      </nuxt-link>
    </p>
  </LoginView>
</template>

<script setup lang="ts">
const router = useRouter();
const localePath = useLocalePath();
const { t } = useI18n();

// Data
const isProcessing = ref(false);
const loginData = ref({
  email: "",
  password: "",
});

// Computed
const isLoginFormComplete = computed(() => {
  return (
    loginData.value.email.length &&
    isEmail(loginData.value.email) &&
    loginData.value.password.length
  );
});

// Methods
const doLogin = () => {
  if (!isLoginFormComplete.value) {
    notifyError(t("login.pleaseEnterYourEmailAndPassword"));
    return;
  }

  loginUser(
    loginData.value.email,
    loginData.value.password,
    isProcessing,
    router,
    localePath,
    t
  );
};
</script>

<style lang="postcss" scoped>
.login-view {
  @apply relative flex items-center justify-center h-screen bg-placeholder;

  & .input {
    @apply mt-2;
  }

  & .forgot-password {
    @apply text-sm text-grey mt-2;
  }

  & .button {
    @apply mt-6;
  }

  & .go-to-signup {
    @apply text-sm text-grey mt-8 text-center;
  }
}
</style>
