/**
 * Format a number as Indian Rupee currency.
 * Example: ₹12,34,567.89
 */
export const formatCurrency = (amount) => {
  const value = Number(amount);

  if (isNaN(value)) {
    return "₹0.00";
  }

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

/**
 * Format a number without the ₹ symbol.
 * Example: 12,34,567.89
 */
export const formatNumber = (amount) => {
  const value = Number(amount);

  if (isNaN(value)) {
    return "0.00";
  }

  return new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

/**
 * Format a compact currency value.
 * Example:
 * ₹950
 * ₹2.5K
 * ₹1.2L
 * ₹3.8Cr
 */
export const formatCompactCurrency = (amount) => {
  const value = Number(amount);

  if (isNaN(value)) {
    return "₹0";
  }

  const absValue = Math.abs(value);

  if (absValue >= 10000000) {
    return `₹${(value / 10000000).toFixed(1)}Cr`;
  }

  if (absValue >= 100000) {
    return `₹${(value / 100000).toFixed(1)}L`;
  }

  if (absValue >= 1000) {
    return `₹${(value / 1000).toFixed(1)}K`;
  }

  return formatCurrency(value);
};

/**
 * Format amount with + or - sign.
 * Example:
 * +₹5,000.00
 * -₹1,250.00
 */
export const formatTransactionAmount = (amount, type) => {
  const formatted = formatCurrency(amount);

  return type === "income"
    ? `+${formatted}`
    : `-${formatted}`;
};