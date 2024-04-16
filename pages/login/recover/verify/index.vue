<template>
  <LoginView :title="$t('login.changePassword')" class="login-view">
    <p class="desc">{{ $t("login.recoveryDesc") }}</p>
    <TextInput
      v-model="formData.token"
      aspect="fill"
      :placeholder="$t('common.code') + '...'"
      :disabled="isChangingPassword"
      required
      class="input"
      autocomplete="off"
      @onEnter="changePassword()"
    />
    <TextInput
      v-model="formData.newPassword"
      type="password"
      aspect="fill"
      :placeholder="$t('common.newPassword') + '...'"
      :disabled="isChangingPassword"
      required
      class="input"
      autocomplete="new-password"
      @onEnter="changePassword()"
    />
    <p class="back-to-login">
      <nuxt-link to="/login/recover"
        >← {{ $t("login.backToRecovery") }}</nuxt-link
      >
    </p>

    <Button
      class="button"
      :value="$t('common.change')"
      :loading="isChangingPassword"
      @click="changePassword()"
    />
  </LoginView>
</template>

<script setup lang="ts">
const { t } = useI18n();
const router = useRouter();
const localePath = useLocalePath();

// Data
const isChangingPassword = ref(false);
const formData = ref({
  email: localStorage.email,
  token: "",
  newPassword: "",
});

// Computed
const isFormComplete = computed(() => {
  return formData.value.token.length && formData.value.newPassword.length;
});

// Methods
const changePassword = () => {
  if (!isFormComplete.value) {
    notifyError(t("login.pleaseEnterCodeAndNewPassword"));
    return;
  }

  isChangingPassword.value = true;

  const mutation = gql`
    mutation Mutation($email: String!, $newPassword: String!, $token: String!) {
      resetUserPassword(email: $email, newPassword: $newPassword, token: $token)
    }
  `;
  const { mutate, onDone, onError } = useMutation(mutation, {
    variables: formData.value,
  });
  onDone(()=>{
    router.push(localePath("/login"));
    localStorage.email = "";
  });
  onError((error)=>{
    isChangingPassword.value = false;
    handleApolloRequestError(error, t);
  });
  mutate.call({});
};
</script>

<style lang="postcss" scoped>
.login-view {
  @apply relative flex items-center justify-center h-screen bg-placeholder;

  & .desc {
    @apply text-sm leading-tight;

    max-width: 80%;
  }

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
