import ReportCard from "./ReportCard";
import { useTransactionContext } from "../../context/TransactionContext";
import { formatCurrency } from "../../utils/formatCurrency";

const SummaryReport = () => {
  const { summary } = useTransactionContext();

  const reportItems = [
    {
      title: "Total Income",
      value: formatCurrency(summary?.totalIncome || 0),
      icon: "📈",
      className: "income",
    },
    {
      title: "Total Expense",
      value: formatCurrency(summary?.totalExpense || 0),
      icon: "📉",
      className: "expense",
    },
    {
      title: "Current Balance",
      value: formatCurrency(summary?.balance || 0),
      icon: "💰",
      className:
        (summary?.balance || 0) >= 0
          ? "balance-positive"
          : "balance-negative",
    },
    {
      title: "Transactions",
      value: summary?.totalTransactions || 0,
      icon: "📊",
      className: "",
    },
  ];

  return (
    <ReportCard
      title="Financial Summary"
      subtitle="Overall overview of your finances"
    >
      <div className="summary-report-grid">
        {reportItems.map((item) => (
          <div
            key={item.title}
            className="summary-report-item"
          >
            <div className="summary-report-icon">
              {item.icon}
            </div>

            <div className="summary-report-content">
              <h4>{item.title}</h4>

              <h2 className={item.className}>
                {item.value}
              </h2>
            </div>
          </div>
        ))}
      </div>
    </ReportCard>
  );
};

export default SummaryReport;