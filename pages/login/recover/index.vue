<template>
  <LoginView :title="$t('login.recoverPassword')" class="login-view">
    <TextInput
      v-model="formData.email"
      type="email"
      aspect="fill"
      :placeholder="$t('common.yourEmail') + '...'"
      :disabled="isDoingRecovery"
      required
      class="input"
      @onEnter="doRecover()"
    />
    <p class="back-to-login">
      <nuxt-link to="/login">← {{ $t("login.backToLogin") }}</nuxt-link>
    </p>

    <Button
      class="button"
      :value="$t('common.recover')"
      :loading="isDoingRecovery"
      @click="doRecover()"
    />
  </LoginView>
</template>

<script setup lang="ts">
const { t } = useI18n();
const router = useRouter();
const localePath = useLocalePath();

// Data
const isDoingRecovery = ref(false);
const formData = ref({
  email: "",
});

// Computed
const isPasswordRecoveryFormComplete = computed(() => {
  return formData.value.email.length;
});

// Methods
const doRecover = () => {
  if (!isPasswordRecoveryFormComplete.value) {
    notifyError(t("login.pleaseEnterYourEmail"));
    return;
  }

  isDoingRecovery.value = true;

  const mutation = gql`
    mutation SendUserPasswordResetToken($email: String!) {
      sendUserPasswordResetToken(email: $email)
    }
  `;
  const { mutate, onDone, onError } = useMutation(mutation, {
    variables: formData.value,
  });
  onDone(() => {
    localStorage.email = formData.value.email;
    router.push(localePath("/login/recover/verify"));
  });
  onError((error) => {
    isDoingRecovery.value = false;
    handleApolloRequestError(error, t);
  });
  mutate.call({});
};
</script>

<style lang="postcss" scoped>
.login-view {
  @apply relative flex items-center justify-center h-screen bg-placeholder;

  & .input {
    @apply mt-2;
  }

  & .back-to-login {
    @apply text-sm text-grey mt-2;
  }

  & .button {
    @apply mt-12;
  }
}
</style>
