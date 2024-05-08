import { ComposerTranslation } from "@nuxtjs/i18n/dist/runtime/composables";
import { Router } from "vue-router";
import { LocalePathFunction } from "vue-i18n";
import { Ref } from "vue";

const USER_COOKIE_NAME = "user";

export const setUserSessionData = (
  id: string,
  identity: Identity,
  role?: UserRole
) => {
  const now = new Date();
  const expires = new Date(
    now.getFullYear() + 10,
    now.getMonth(),
    now.getDate()
  );

  const config = useRuntimeConfig();
  const isDev = Boolean(config.public.IS_DEV);
  const secure = !isDev;

  const userCookie = useCookie(USER_COOKIE_NAME, {
    default: () => ({} as AccountData),
    expires,
    secure,
  });

  userCookie.value = {
    id,
    identity,
    role,
  } as AccountData;
};

export const isUserAuthenticated = (): boolean => {
  const userCookie = useCookie(USER_COOKIE_NAME);
  const authToken = useCookie("auth-token");

  return (
    typeof userCookie.value !== "undefined" &&
    typeof authToken.value !== "undefined"
  );
};

export const getUserIdentity = (): Identity => {
  const userCookie = useCookie(USER_COOKIE_NAME, {
    default: () => ({} as AccountData),
  });

  return ((userCookie.value as unknown as AccountData).identity || {
    name: "...",
  }) as Identity;
};

export const getUserId = (): string | undefined => {
  const userCookie = useCookie(USER_COOKIE_NAME, {
    default: () => ({} as AccountData),
  });

  return userCookie.value?.id;
};

export const logOutCurrentUser = () => {
  const userCookie = useCookie(USER_COOKIE_NAME);
  userCookie.value = null;
};

export const loginUser = (
  email: string,
  password: string,
  isLoading: Ref<boolean>,
  router: Router,
  localePath: LocalePathFunction,
  t: ComposerTranslation
) => {
  isLoading.value = true;

  const mutation = gql`
    mutation login($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        id
        role
        profile {
          privateIdentity {
            name
            gender
            pronouns
            imageUrl
          }
          publicIdentity {
            imageUrl
          }
        }
      }
    }
  `;

  const { mutate, onDone, onError } = useMutation(mutation, {
    variables: {
      email,
      password,
    },
  });
  onDone((result) => {
    const userData = result.data?.login;
    if (!userData) {
      throw new Error("Unable to resolve user data from client");
    }
    const profileImageUrl =
      userData.profile.privateIdentity.imageUrl ||
      userData.profile.publicIdentity.imageUrl;
    userData.profile.privateIdentity.imageUrl = profileImageUrl;

    setUserSessionData(
      userData.id,
      userData.profile.privateIdentity,
      userData.role
    );

    isLoading.value = false;

    // HANDLE REDIRECT
  });
  onError((error) => {
    isLoading.value = false;

    const errorCode = error.graphQLErrors[0]?.extensions?.code;
    console.log("ERROR_CODE_IS", errorCode, error.graphQLErrors[0]);

    handleApolloRequestError(error, t);
  });
  mutate.call({});
};
