/**
 * Format a date into DD/MM/YYYY.
 */
export const formatDate = (date) => {
  if (!date) return "";

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(date));
};

/**
 * Format date as "02 Jul 2026".
 */
export const formatLongDate = (date) => {
  if (!date) return "";

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
};

/**
 * Format date with time.
 * Example: 02 Jul 2026, 10:45 AM
 */
export const formatDateTime = (date) => {
  if (!date) return "";

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
};

/**
 * Format month and year.
 * Example: July 2026
 */
export const formatMonthYear = (date) => {
  if (!date) return "";

  return new Intl.DateTimeFormat("en-IN", {
    month: "long",
    year: "numeric",
  }).format(new Date(date));
};

/**
 * Check if a date is today.
 */
export const isToday = (date) => {
  const today = new Date();
  const target = new Date(date);

  return (
    today.getDate() === target.getDate() &&
    today.getMonth() === target.getMonth() &&
    today.getFullYear() === target.getFullYear()
  );
};

/**
 * Check if a date is yesterday.
 */
export const isYesterday = (date) => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  const target = new Date(date);

  return (
    yesterday.getDate() === target.getDate() &&
    yesterday.getMonth() === target.getMonth() &&
    yesterday.getFullYear() === target.getFullYear()
  );
};

/**
 * Display relative date.
 */
export const getRelativeDate = (date) => {
  if (isToday(date)) return "Today";

  if (isYesterday(date)) return "Yesterday";

  return formatLongDate(date);
};