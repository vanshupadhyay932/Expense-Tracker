import { formatCurrency } from "../../utils/formatCurrency";
import { formatDate } from "../../utils/formatDate";

const TransactionRow = ({
  transaction,
  onEdit,
  onDelete,
}) => {
  return (
    <tr>

      <td>
        <span
          className={`transaction-type ${
            transaction.type
          }`}
        >
          {transaction.type === "income"
            ? "Income"
            : "Expense"}
        </span>
      </td>

      <td>{transaction.category}</td>

      <td>{transaction.description}</td>

      <td
        className={
          transaction.type === "income"
            ? "income"
            : "expense"
        }
      >
        {formatCurrency(transaction.amount)}
      </td>

      <td>
        {formatDate(transaction.date)}
      </td>

      <td>

        <button
          className="action-btn edit-btn"
          onClick={() =>
            onEdit(transaction)
          }
        >
          Edit
        </button>

        <button
          className="action-btn delete-btn"
          onClick={() =>
            onDelete(transaction)
          }
        >
          Delete
        </button>

      </td>

    </tr>
  );
};

export default TransactionRow;