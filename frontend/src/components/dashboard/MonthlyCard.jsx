import { useMemo } from "react";
import { useTransactionContext } from "../../context/TransactionContext";
import { formatCurrency } from "../../utils/formatCurrency";

const MonthlyCard = () => {
  const { monthlyReport } = useTransactionContext();

  const currentMonth = useMemo(() => {
    return new Date().toLocaleString("default", {
      month: "long",
      year: "numeric",
    });
  }, []);

  const currentMonthData = monthlyReport[currentMonth] || {
    income: 0,
    expense: 0,
  };

  const balance =
    currentMonthData.income -
    currentMonthData.expense;

  return (
    <div className="monthly-card">

      <div className="monthly-card-header">

        <h2>This Month</h2>

        <span>{currentMonth}</span>

      </div>

      <div className="monthly-card-body">

        <div className="monthly-item">

          <p>Income</p>

          <h3 className="income">
            {formatCurrency(
              currentMonthData.income
            )}
          </h3>

        </div>

        <div className="monthly-item">

          <p>Expense</p>

          <h3 className="expense">
            {formatCurrency(
              currentMonthData.expense
            )}
          </h3>

        </div>

        <div className="monthly-item">

          <p>Balance</p>

          <h3 className="balance">
            {formatCurrency(balance)}
          </h3>

        </div>

      </div>

    </div>
  );
};

export default MonthlyCard;