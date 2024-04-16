export default defineNuxtRouteMiddleware((to, from) => {
  const localePath = useLocalePath();

  if (!isUserAuthenticated()) {
    return navigateTo(localePath("/login"));
  }
});
