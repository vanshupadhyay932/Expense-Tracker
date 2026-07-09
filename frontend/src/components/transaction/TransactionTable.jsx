import { useMemo, useState } from "react";
import { useTransactionContext } from "../../context/TransactionContext";
import { formatCurrency } from "../../utils/formatCurrency";
import { formatLongDate } from "../../utils/formatDate";
import { capitalize } from "../../utils/helpers";
import TransactionForm from "./TransactionForm";

const TransactionTable = () => {
  const {
    transactions,
    loading,
    removeTransaction,
  } = useTransactionContext();

  const [editingTransaction, setEditingTransaction] =
    useState(null);

  const [search, setSearch] = useState("");

  const [filterType, setFilterType] =
    useState("all");

  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      const matchesSearch =
        transaction.category
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        transaction.description
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesType =
        filterType === "all"
          ? true
          : transaction.type === filterType;

      return matchesSearch && matchesType;
    });
  }, [transactions, search, filterType]);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this transaction?"
    );

    if (!confirmed) return;

    await removeTransaction(id);
  };

  if (loading) {
    return <h2>Loading transactions...</h2>;
  }

  return (
    <div className="transaction-table-container">

      {editingTransaction && (
        <TransactionForm
          transaction={editingTransaction}
          onSuccess={() =>
            setEditingTransaction(null)
          }
          onCancel={() =>
            setEditingTransaction(null)
          }
        />
      )}

      <div className="transaction-toolbar">

        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(event) =>
            setSearch(event.target.value)
          }
        />

        <select
          value={filterType}
          onChange={(event) =>
            setFilterType(event.target.value)
          }
        >
          <option value="all">
            All
          </option>

          <option value="income">
            Income
          </option>

          <option value="expense">
            Expense
          </option>

        </select>

      </div>

      <table className="transaction-table">

        <thead>

          <tr>

            <th>Date</th>

            <th>Category</th>

            <th>Type</th>

            <th>Description</th>

            <th>Amount</th>

            <th>Actions</th>

          </tr>

        </thead>

        <tbody>

          {filteredTransactions.length === 0 ? (
            <tr>
              <td
                colSpan="6"
                style={{
                  textAlign: "center",
                }}
              >
                No transactions found.
              </td>
            </tr>
          ) : (
            filteredTransactions.map(
              (transaction) => (
                <tr key={transaction._id}>

                  <td>
                    {formatLongDate(
                      transaction.date
                    )}
                  </td>

                  <td>
                    {capitalize(
                      transaction.category
                    )}
                  </td>

                  <td>
                    {capitalize(
                      transaction.type
                    )}
                  </td>

                  <td>
                    {transaction.description ||
                      "-"}
                  </td>

                  <td
                    className={
                      transaction.type
                    }
                  >
                    {transaction.type ===
                    "income"
                      ? "+"
                      : "-"}

                    {formatCurrency(
                      transaction.amount
                    )}
                  </td>

                  <td>
                    <div className="action-buttons">

                      <button
                        className="edit-btn"
                        onClick={() =>
                          setEditingTransaction(
                            transaction
                          )
                        }
                      >
                        Edit
                      </button>

                      <button
                        className="delete-btn"
                        onClick={() =>
                          handleDelete(
                            transaction._id
                          )
                        }
                      >
                        Delete
                      </button>

                    </div>
                  </td>

                </tr>
              )
            )
          )}

        </tbody>

      </table>

    </div>
  );
};

export default TransactionTable;