import Card from "../common/Card";
import { useTransactionContext } from "../../context/TransactionContext";
import { formatCurrency } from "../../utils/formatCurrency";

const BalanceCard = () => {
  const { summary } = useTransactionContext();

  const balance = summary?.balance || 0;

  const isPositive = balance >= 0;

  return (
    <Card
      className={`balance-card ${
        isPositive ? "positive" : "negative"
      }`}
    >
      <div className="balance-card-header">

        <div>
          <p className="balance-title">
            Current Balance
          </p>

          <h2 className="balance-amount">
            {formatCurrency(balance)}
          </h2>
        </div>

      </div>

      <div className="balance-footer">
        <span
          className={
            isPositive
              ? "balance-status positive"
              : "balance-status negative"
          }
        >
          {isPositive
            ? "Positive Balance"
            : "Negative Balance"}
        </span>
      </div>
    </Card>
  );
};

export default BalanceCard;