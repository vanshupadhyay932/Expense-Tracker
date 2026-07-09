/**
 * Capitalize the first letter of a string.
 */
export const capitalize = (text) => {
  if (!text) return "";

  return text.charAt(0).toUpperCase() + text.slice(1);
};

/**
 * Capitalize every word in a string.
 */
export const capitalizeWords = (text) => {
  if (!text) return "";

  return text
    .split(" ")
    .map((word) => capitalize(word))
    .join(" ");
};

/**
 * Truncate long text.
 */
export const truncateText = (text, maxLength = 40) => {
  if (!text) return "";

  return text.length > maxLength
    ? `${text.substring(0, maxLength)}...`
    : text;
};

/**
 * Generate initials from a user's name.
 */
export const getInitials = (name) => {
  if (!name) return "";

  return name
    .trim()
    .split(" ")
    .map((word) => word[0].toUpperCase())
    .join("");
};

/**
 * Generate a random color for avatars.
 */
export const getRandomColor = () => {
  const colors = [
    "#2563EB",
    "#DC2626",
    "#059669",
    "#F59E0B",
    "#7C3AED",
    "#0891B2",
    "#EA580C",
    "#DB2777",
  ];

  return colors[Math.floor(Math.random() * colors.length)];
};

/**
 * Check if an object is empty.
 */
export const isObjectEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};

/**
 * Debounce function.
 * Useful for search inputs.
 */
export const debounce = (callback, delay = 500) => {
  let timer;

  return (...args) => {
    clearTimeout(timer);

    timer = setTimeout(() => {
      callback(...args);
    }, delay);
  };
};

/**
 * Sort transactions by date.
 */
export const sortByNewest = (transactions) => {
  return [...transactions].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
};

/**
 * Sort transactions by amount.
 */
export const sortByAmount = (transactions, descending = true) => {
  return [...transactions].sort((a, b) =>
    descending
      ? b.amount - a.amount
      : a.amount - b.amount
  );
};

/**
 * Group transactions by category.
 */
export const groupByCategory = (transactions) => {
  return transactions.reduce((result, transaction) => {
    const category = transaction.category;

    if (!result[category]) {
      result[category] = [];
    }

    result[category].push(transaction);

    return result;
  }, {});
};