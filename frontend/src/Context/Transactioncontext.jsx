import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

import {
  getTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} from "../services/transactionService";

import {
  getSummaryReport,
  getMonthlyReport,
  getCategoryReport,
} from "../services/reportService";

export const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);

  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
    totalTransactions: 0,
  });

  const [monthlyReport, setMonthlyReport] = useState({});

  const [categoryReport, setCategoryReport] = useState({});

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  /**
   * Fetch everything required for dashboard
   */
  const fetchDashboardData = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const [
        transactionsData,
        summaryData,
        monthlyData,
        categoryData,
      ] = await Promise.all([
        getTransactions(),
        getSummaryReport(),
        getMonthlyReport(),
        getCategoryReport(),
      ]);

      setTransactions(transactionsData);

      setSummary(summaryData);

      setMonthlyReport(monthlyData);

      setCategoryReport(categoryData);
    } catch (err) {
      setError(
        err.message || "Failed to load data."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  /**
   * Add Transaction
   */
  const addTransaction = async (transactionData) => {
    const transaction =
      await createTransaction(transactionData);

    await fetchDashboardData();

    return transaction;
  };

  /**
   * Update Transaction
   */
  const editTransaction = async (
    id,
    transactionData
  ) => {
    const transaction =
      await updateTransaction(
        id,
        transactionData
      );

    await fetchDashboardData();

    return transaction;
  };

  /**
   * Delete Transaction
   */
  const removeTransaction = async (id) => {
    await deleteTransaction(id);

    await fetchDashboardData();
  };

  const value = {
    transactions,
    summary,
    monthlyReport,
    categoryReport,
    loading,
    error,
    addTransaction,
    editTransaction,
    removeTransaction,
    refreshDashboard: fetchDashboardData,
  };

  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactionContext = () => {
  const context = useContext(TransactionContext);

  if (!context) {
    throw new Error(
      "useTransactionContext must be used within TransactionProvider"
    );
  }

  return context;
};