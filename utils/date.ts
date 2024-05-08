import {
  format,
  differenceInHours,
  add,
  startOfMonth,
  endOfMonth,
} from "date-fns";

import * as DateFnsLocale from "date-fns/locale";

import { useI18n } from "vue-i18n";

export const getFormattedDateTime = (dateString: string | number): string => {
  const date = new Date(dateString);
  return format(date, "d/M/Y - HH:mm");
};

export const addToDate = (
  dateString: string | number | Date,
  duration: Duration
): Date => {
  const date = new Date(dateString);
  return add(date, duration);
};

export const getFormatDate = (
  dateString: string | number | Date,
  formatString = "d/M/Y",
  options = {}
): string => {
  const date = new Date(dateString);
  return format(date, formatString, options);
};

export const getStartOfMonth = (dateString: string | number | Date): Date => {
  const date = new Date(dateString);
  return startOfMonth(date);
};

export const getEndOfMonth = (dateString: string | number | Date): Date => {
  const date = new Date(dateString);
  return endOfMonth(date);
};

export const getDifferenceInHours = (
  firstDate: Date,
  secondDate: Date
): number => {
  return differenceInHours(firstDate, secondDate);
};

export { DateFnsLocale };
