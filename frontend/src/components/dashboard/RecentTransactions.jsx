import { Link } from "react-router-dom";
import { PRIVATE_ROUTES } from "../../constants/routes";
import { useTransactionContext } from "../../context/TransactionContext";
import { formatCurrency } from "../../utils/formatCurrency";
import { getRelativeDate } from "../../utils/formatDate";
import { capitalize } from "../../utils/helpers";

const RecentTransactions = () => {
  const { transactions, loading } = useTransactionContext();

  if (loading) {
    return (
      <div className="recent-transactions">
        <h2>Recent Transactions</h2>
        <p>Loading transactions...</p>
      </div>
    );
  }

  const recentTransactions = transactions.slice(0, 5);

  return (
    <div className="recent-transactions">
      <div className="recent-transactions-header">
        <h2>Recent Transactions</h2>
<Link
  to={PRIVATE_ROUTES.TRANSACTIONS}
  className="view-all-btn"
>
  View All
</Link>
      </div>

      {recentTransactions.length === 0 ? (
        <div className="empty-state">
          <p>No transactions found.</p>
        </div>
      ) : (
        <div className="transaction-list">
          {recentTransactions.map((transaction) => (
            <div
              key={transaction._id}
              className="transaction-item"
            >
              <div className="transaction-left">
                <div
                  className={`transaction-type ${
                    transaction.type
                  }`}
                >
                  {transaction.type === "income"
  ? "IN"
  : "EX"}
                </div>

                <div className="transaction-details">
                  <h4>
                    {capitalize(
                      transaction.category
                    )}
                  </h4>

                  <p>
                    {transaction.description ||
                      "No description"}
                  </p>

                  <small>
                    {getRelativeDate(
                      transaction.date
                    )}
                  </small>
                </div>
              </div>

              <div
                className={`transaction-amount ${
                  transaction.type
                }`}
              >
                {transaction.type === "income"
                  ? "+"
                  : "-"}
                {formatCurrency(
                  transaction.amount
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentTransactions;