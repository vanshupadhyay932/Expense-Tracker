import { useEffect, useState } from "react";
import Modal from "../common/Modal";
import TransactionForm from "./TransactionForm";
import { useTransactionContext } from "../../context/TransactionContext";

const EditTransaction = ({
  isOpen,
  transaction,
  onClose,
}) => {
  const { updateTransaction } =
    useTransactionContext();

  const [formData, setFormData] = useState({
    type: "expense",
    category: "",
    amount: "",
    description: "",
    date: "",
  });

  useEffect(() => {
    if (transaction) {
      setFormData({
        type: transaction.type || "expense",
        category: transaction.category || "",
        amount: transaction.amount || "",
        description:
          transaction.description || "",
        date: transaction.date
          ? transaction.date.split("T")[0]
          : "",
      });
    }
  }, [transaction]);

  const handleSubmit = async (data) => {
    try {
      await updateTransaction(
        transaction._id,
        data
      );

      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      title="Edit Transaction"
      onClose={onClose}
    >
      <TransactionForm
        initialValues={formData}
        onSubmit={handleSubmit}
        submitButtonText="Update Transaction"
      />
    </Modal>
  );
};

export default EditTransaction;