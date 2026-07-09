import Card from "../common/Card";
import { useTransactionContext } from "../../context/TransactionContext";
import { formatCurrency } from "../../utils/formatCurrency";

const ExpenseCard = () => {
  const { summary } = useTransactionContext();

  const totalExpense = summary?.totalExpense || 0;

  return (
    <Card className="expense-card">

      <div className="expense-card-header">

        <div>
          <p className="expense-title">
            Total Expenses
          </p>

          <h2 className="expense-amount">
            {formatCurrency(totalExpense)}
          </h2>
        </div>

      </div>

      <div className="expense-card-footer">

        <span className="expense-label">
          Total money spent
        </span>

      </div>

    </Card>
  );
};

export default ExpenseCard;