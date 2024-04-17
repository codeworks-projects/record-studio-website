import { DEFAULT_LOCALE } from "./config";

export default defineI18nConfig(() => ({
  legacy: false,
  locale: DEFAULT_LOCALE,
  messages: {},
}));
