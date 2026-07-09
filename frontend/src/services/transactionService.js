import api from "../config/axios";
import { TRANSACTION_API } from "../constants/api";

/**
 * Get all transactions.
 */
export const getTransactions = async () => {
  try {
    const response = await api.get(
      TRANSACTION_API.GET_ALL
    );

    return response.data.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Failed to fetch transactions.",
      }
    );
  }
};

/**
 * Get a single transaction.
 */
export const getTransactionById = async (id) => {
  try {
    const response = await api.get(
      TRANSACTION_API.GET_BY_ID(id)
    );

    return response.data.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Transaction not found.",
      }
    );
  }
};

/**
 * Create a new transaction.
 */
export const createTransaction = async (transactionData) => {
  try {
    const response = await api.post(
      TRANSACTION_API.CREATE,
      transactionData
    );

    return response.data.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Failed to create transaction.",
      }
    );
  }
};

/**
 * Update an existing transaction.
 */
export const updateTransaction = async (
  id,
  transactionData
) => {
  try {
    const response = await api.put(
      TRANSACTION_API.UPDATE(id),
      transactionData
    );

    return response.data.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Failed to update transaction.",
      }
    );
  }
};

/**
 * Delete a transaction.
 */
export const deleteTransaction = async (id) => {
  try {
    const response = await api.delete(
      TRANSACTION_API.DELETE(id)
    );

    return response.data.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Failed to delete transaction.",
      }
    );
  }
};