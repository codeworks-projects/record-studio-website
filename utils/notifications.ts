import { useNotification } from "@kyvg/vue3-notification";
const { notify } = useNotification();

export const notifyError = (message: string, duration?: number) => {
  notify({
    group: "main",
    title: message,
    duration: duration || 5000,
    type: "error",
  });
};

export const notifySuccess = (message: string, duration?: number) => {
  notify({
    group: "main",
    text: message,
    duration: duration || 3000,
    type: "success",
  });
};
