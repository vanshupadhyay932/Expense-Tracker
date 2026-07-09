import { useState, useEffect, useCallback } from "react";
import {
  getTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} from "../services/transactionService";

const useTransactions = () => {
  const [transactions, setTransactions] = useState([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  /**
   * Fetch all transactions
   */
  const fetchTransactions = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getTransactions();

      setTransactions(data);
    } catch (err) {
      setError(
        err.message || "Failed to fetch transactions."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Load transactions on component mount
   */
  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  /**
   * Add a transaction
   */
  const addTransaction = async (transactionData) => {
    try {
      const newTransaction =
        await createTransaction(transactionData);

      setTransactions((previous) => [
        newTransaction,
        ...previous,
      ]);

      return newTransaction;
    } catch (err) {
      throw err;
    }
  };

  /**
   * Update a transaction
   */
  const editTransaction = async (
    id,
    transactionData
  ) => {
    try {
      const updatedTransaction =
        await updateTransaction(
          id,
          transactionData
        );

      setTransactions((previous) =>
        previous.map((transaction) =>
          transaction._id === id
            ? updatedTransaction
            : transaction
        )
      );

      return updatedTransaction;
    } catch (err) {
      throw err;
    }
  };

  /**
   * Delete a transaction
   */
  const removeTransaction = async (id) => {
    try {
      await deleteTransaction(id);

      setTransactions((previous) =>
        previous.filter(
          (transaction) =>
            transaction._id !== id
        )
      );
    } catch (err) {
      throw err;
    }
  };

  /**
   * Refresh transactions
   */
  const refreshTransactions = async () => {
    await fetchTransactions();
  };

  return {
    transactions,
    loading,
    error,
    addTransaction,
    editTransaction,
    removeTransaction,
    refreshTransactions,
  };
};

export default useTransactions;