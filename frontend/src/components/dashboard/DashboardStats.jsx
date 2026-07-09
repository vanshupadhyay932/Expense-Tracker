import { useTransactionContext } from "../../context/TransactionContext";

import SummaryCard from "./SummaryCard";
import BalanceCard from "./BalanceCard";
import CategoryCard from "./CategoryCard";
import MonthlyCard from "./MonthlyCard";

const DashboardStats = () => {
  const { summary } = useTransactionContext();

  return (
    <section className="dashboard-stats">

      <BalanceCard />

      <SummaryCard
        title="Total Income"
        value={summary?.totalIncome || 0}
        icon=""
        color="#16A34A"
      />

      <SummaryCard
        title="Total Expense"
        value={summary?.totalExpense || 0}
        icon=""
        color="#DC2626"
      />

      <SummaryCard
        title="Transactions"
        value={summary?.totalTransactions || 0}
        icon=""
        color="#7C3AED"
        isCurrency={false}
      />

      <CategoryCard />

      <MonthlyCard />

    </section>
  );
};

export default DashboardStats;