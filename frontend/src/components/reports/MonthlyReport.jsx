import { useMemo } from "react";
import { useTransactionContext } from "../../context/TransactionContext";
import { formatCurrency } from "../../utils/formatCurrency";

const MonthlyReport = () => {
  const { monthlyReport } = useTransactionContext();

  const reportData = useMemo(() => {
    return Object.entries(monthlyReport).map(
      ([month, data]) => ({
        month,
        income: data.income,
        expense: data.expense,
        balance: data.income - data.expense,
      })
    );
  }, [monthlyReport]);

  if (reportData.length === 0) {
    return (
      <div className="monthly-report">
        <h2>Monthly Report</h2>
        <p>No monthly data available.</p>
      </div>
    );
  }

  return (
    <div className="monthly-report">

      <div className="report-header">
        <h2>Monthly Financial Report</h2>
      </div>

      <table className="report-table">

        <thead>
          <tr>
            <th>Month</th>
            <th>Income</th>
            <th>Expense</th>
            <th>Balance</th>
          </tr>
        </thead>

        <tbody>

          {reportData.map((item) => (
            <tr key={item.month}>

              <td>{item.month}</td>

              <td className="income">
                {formatCurrency(item.income)}
              </td>

              <td className="expense">
                {formatCurrency(item.expense)}
              </td>

              <td
                className={
                  item.balance >= 0
                    ? "balance-positive"
                    : "balance-negative"
                }
              >
                {formatCurrency(item.balance)}
              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
};

export default MonthlyReport;