import Card from "../common/Card";
import { useTransactionContext } from "../../context/TransactionContext";
import { formatCurrency } from "../../utils/formatCurrency";

const IncomeCard = () => {
  const { summary } = useTransactionContext();

  const totalIncome = summary?.totalIncome || 0;

  return (
    <Card className="income-card">

      <div className="income-card-header">

        <div>
          <p className="income-title">
            Total Income
          </p>

          <h2 className="income-amount">
            {formatCurrency(totalIncome)}
          </h2>
        </div>

      </div>

      <div className="income-card-footer">

        <span className="income-label">
          Total money received
        </span>

      </div>

    </Card>
  );
};

export default IncomeCard;