import DashboardHeader from "../components/dashboard/DashboardHeader";
import SummaryCard from "../components/dashboard/SummaryCard";
import RecentTransactions from "../components/dashboard/RecentTransactions";
import { useTransactionContext } from "../context/TransactionContext";

const Dashboard = () => {
  const {
    summary,
    loading,
    error,
  } = useTransactionContext();

  if (loading) {
    return (
      <div className="dashboard-loading">
        <h2>Loading Dashboard...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-error">
        <h2>{error}</h2>
      </div>
    );
  }

  return (
    <div className="dashboard-page">

      <DashboardHeader />

      <section className="summary-section">

        <SummaryCard
          title="Total Balance"
          value={summary.balance}
          icon="💰"
          color="#2563EB"
        />

        <SummaryCard
          title="Total Income"
          value={summary.totalIncome}
          icon="📈"
          color="#16A34A"
        />

        <SummaryCard
          title="Total Expense"
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

      <section className="dashboard-content">

        <RecentTransactions />

      </section>

    </div>
  );
};

export default Dashboard;