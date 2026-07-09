import { useState } from "react";
import TransactionForm from "../components/transaction/TransactionForm";
import TransactionTable from "../components/transaction/TransactionTable";

const Transactions = () => {
  const [showForm, setShowForm] = useState(false);

  const handleAddTransaction = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  return (
    <div className="transactions-page">

      <div className="transactions-header">

        <div>
          <h1>Transactions</h1>

          <p>
            Manage your income and expenses.
          </p>
        </div>

        <button
          className="add-transaction-btn"
          onClick={handleAddTransaction}
        >
          + Add Transaction
        </button>

      </div>

      {showForm && (
        <div className="transaction-form-wrapper">

          <TransactionForm
            onSuccess={handleCloseForm}
            onCancel={handleCloseForm}
          />

        </div>
      )}

      <TransactionTable />

    </div>
  );
};

export default Transactions;