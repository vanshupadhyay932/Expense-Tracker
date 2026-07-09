import api from "../config/axios";
import { REPORT_API } from "../constants/api";

/**
 * Get summary report.
 * Returns:
 * {
 *   totalIncome,
 *   totalExpense,
 *   balance,
 *   totalTransactions
 * }
 */
export const getSummaryReport = async () => {
  try {
    const response = await api.get(REPORT_API.SUMMARY);

    return response.data.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Failed to fetch summary report.",
      }
    );
  }
};

/**
 * Get monthly report.
 * Returns:
 * {
 *   "July 2026": {
 *      income: 50000,
 *      expense: 25000
 *   }
 * }
 */
export const getMonthlyReport = async () => {
  try {
    const response = await api.get(REPORT_API.MONTHLY);

    return response.data.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Failed to fetch monthly report.",
      }
    );
  }
};

/**
 * Get category report.
 * Returns:
 * {
 *   Food: 5000,
 *   Travel: 2000,
 *   Shopping: 3500
 * }
 */
export const getCategoryReport = async () => {
  try {
    const response = await api.get(REPORT_API.CATEGORY);

    return response.data.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Failed to fetch category report.",
      }
    );
  }
};