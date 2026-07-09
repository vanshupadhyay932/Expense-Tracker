import { useEffect, useState } from "react";
import { useTransactionContext } from "../../context/TransactionContext";
import {
  TRANSACTION_TYPES,
  INCOME_CATEGORIES,
  EXPENSE_CATEGORIES,
} from "../../constants/transactionTypes";
import { validateTransaction } from "../../utils/validation";

const initialState = {
  type: TRANSACTION_TYPES.EXPENSE,
  category: "",
  amount: "",
  description: "",
  date: new Date().toISOString().split("T")[0],
};

const TransactionForm = ({
  transaction = null,
  onSuccess,
  onCancel,
}) => {
  const { addTransaction, editTransaction } =
    useTransactionContext();

  const [formData, setFormData] =
    useState(initialState);

  const [errors, setErrors] = useState({});

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    if (transaction) {
      setFormData({
        ...transaction,
        date: transaction.date.split("T")[0],
      });
    }
  }, [transaction]);

  const categories =
    formData.type ===
    TRANSACTION_TYPES.INCOME
      ? INCOME_CATEGORIES
      : EXPENSE_CATEGORIES;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors =
      validateTransaction(formData);

    if (
      Object.keys(validationErrors).length > 0
    ) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);

      if (transaction) {
        await editTransaction(
          transaction._id,
          formData
        );
      } else {
        await addTransaction(formData);
      }

      setFormData(initialState);

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      alert(
        error.message ||
          "Operation failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="transaction-form"
      onSubmit={handleSubmit}
    >
      <h2>
        {transaction
          ? "Edit Transaction"
          : "Add Transaction"}
      </h2>

      <div className="form-group">
        <label>Type</label>

        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
        >
          <option
            value={
              TRANSACTION_TYPES.INCOME
            }
          >
            Income
          </option>

          <option
            value={
              TRANSACTION_TYPES.EXPENSE
            }
          >
            Expense
          </option>
        </select>
      </div>

      <div className="form-group">
        <label>Category</label>

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="">
            Select Category
          </option>

          {categories.map((category) => (
            <option
              key={category}
              value={category}
            >
              {category}
            </option>
          ))}
        </select>

        {errors.category && (
          <small>{errors.category}</small>
        )}
      </div>

      <div className="form-group">
        <label>Amount</label>

        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
        />

        {errors.amount && (
          <small>{errors.amount}</small>
        )}
      </div>

      <div className="form-group">
        <label>Description</label>

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="3"
        />

        {errors.description && (
          <small>
            {errors.description}
          </small>
        )}
      </div>

      <div className="form-group">
        <label>Date</label>

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />

        {errors.date && (
          <small>{errors.date}</small>
        )}
      </div>

      <div className="form-actions">
        <button
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Saving..."
            : transaction
            ? "Update"
            : "Add Transaction"}
        </button>

        {transaction && (
          <button
            type="button"
            onClick={onCancel}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default TransactionForm;