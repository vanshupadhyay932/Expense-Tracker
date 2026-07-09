import { useState, useEffect, useCallback } from "react";
import {
  getSummaryReport,
  getMonthlyReport,
  getCategoryReport,
} from "../services/reportService";

const useReports = () => {
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
   * Fetch all reports
   */
  const fetchReports = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const [
        summaryData,
        monthlyData,
        categoryData,
      ] = await Promise.all([
        getSummaryReport(),
        getMonthlyReport(),
        getCategoryReport(),
      ]);

      setSummary(summaryData);
      setMonthlyReport(monthlyData);
      setCategoryReport(categoryData);
    } catch (err) {
      setError(
        err.message || "Failed to fetch reports."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Load reports on component mount
   */
  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  /**
   * Refresh reports manually
   */
  const refreshReports = async () => {
    await fetchReports();
  };

  return {
    summary,
    monthlyReport,
    categoryReport,
    loading,
    error,
    refreshReports,
  };
};

export default useReports;