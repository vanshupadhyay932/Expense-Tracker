import SummaryCard from "../components/dashboard/SummaryCard";
import Charts from "../components/reports/Charts";
import MonthlyReport from "../components/reports/MonthlyReport";
import CategoryReport from "../components/reports/CategoryReport";
import Loader from "../components/common/Loader";

import { useTransactionContext } from "../context/TransactionContext";

const Reports = () => {
  const {
    summary,
    monthlyReport,
    categoryReport,
    loading,
    error,
  } = useTransactionContext();

  if (loading) {
    return (
      <Loader text="Loading Reports..." />
    );
  }

  if (error) {
    return (
      <div className="reports-error">
        <h2>{error}</h2>
      </div>
    );
  }

  return (
    <div className="reports-page">

      <div className="reports-header">

        <h1>Reports & Analytics</h1>

        <p>
          Analyze your income, expenses and spending patterns.
        </p>

      </div>

      <section className="summary-section">

        <SummaryCard
          title="Balance"
          value={summary.balance}
          icon="💰"
          color="#2563EB"
        />

        <SummaryCard
          title="Income"
          value={summary.totalIncome}
          icon="📈"
          color="#16A34A"
        />

        <SummaryCard
          title="Expense"
          value={summary.totalExpense}
          icon="📉"
          color="#DC2626"
        />

        <SummaryCard
          title="Transactions"
          value={summary.totalTransactions}
          icon="📊"
          color="#7C3AED"
          isCurrency={false}
        />

      </section>

      <section className="reports-chart-section">

        <Charts
          monthlyReport={monthlyReport}
          categoryReport={categoryReport}
        />

      </section>

      <section className="reports-table-section">

        <MonthlyReport />

        <CategoryReport />

      </section>

    </div>
  );
};

export default Reports;