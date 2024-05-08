export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook("apollo:error", (error) => {
    console.warn("An Apollo error occurred", error);
  });
});
