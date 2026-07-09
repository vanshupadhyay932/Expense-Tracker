import { useState } from "react";
import Modal from "../common/Modal";
import Button from "../common/Button";
import { useTransactionContext } from "../../context/TransactionContext";

const DeleteTransaction = ({
  isOpen,
  transaction,
  onClose,
}) => {
  const { deleteTransaction } =
    useTransactionContext();

  const [loading, setLoading] =
    useState(false);

  const handleDelete = async () => {
    if (!transaction) return;

    try {
      setLoading(true);

      await deleteTransaction(
        transaction._id
      );

      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      title="Delete Transaction"
      onClose={onClose}
    >
      <div className="delete-transaction">

        <p className="delete-message">
          Are you sure you want to delete
          this transaction?
        </p>

        {transaction && (
          <div className="transaction-preview">

            <p>
              <strong>Type:</strong>{" "}
              {transaction.type}
            </p>

            <p>
              <strong>Category:</strong>{" "}
              {transaction.category}
            </p>

            <p>
              <strong>Amount:</strong> ₹
              {transaction.amount.toLocaleString(
                "en-IN"
              )}
            </p>

            <p>
              <strong>Description:</strong>{" "}
              {transaction.description}
            </p>

          </div>
        )}

        <div className="delete-actions">

          <Button
            variant="outline"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </Button>

          <Button
            variant="danger"
            loading={loading}
            onClick={handleDelete}
          >
            Delete
          </Button>

        </div>

      </div>
    </Modal>
  );
};

export default DeleteTransaction;