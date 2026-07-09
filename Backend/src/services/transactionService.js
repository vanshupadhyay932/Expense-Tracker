const Transaction = require("../models/Transaction");

/**
 * Create Transaction
 */
const createTransaction = async (
  userId,
  transactionData
) => {
  const transaction =
    await Transaction.create({
      ...transactionData,
      user: userId,
    });

  return transaction;
};

/**
 * Get All Transactions
 */
const getTransactions = async (
  userId
) => {
  const transactions =
    await Transaction.find({
      user: userId,
    }).sort({
      date: -1,
    });

  return transactions;
};

/**
 * Get Single Transaction
 */
const getTransactionById = async (
  transactionId,
  userId
) => {
  const transaction =
    await Transaction.findOne({
      _id: transactionId,
      user: userId,
    });

  if (!transaction) {
    throw new Error(
      "Transaction not found"
    );
  }

  return transaction;
};

/**
 * Update Transaction
 */
const updateTransaction = async (
  transactionId,
  userId,
  updateData
) => {
  const transaction =
    await Transaction.findOneAndUpdate(
      {
        _id: transactionId,
        user: userId,
      },
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

  if (!transaction) {
    throw new Error(
      "Transaction not found"
    );
  }

  return transaction;
};

/**
 * Delete Transaction
 */
const deleteTransaction = async (
  transactionId,
  userId
) => {
  const transaction =
    await Transaction.findOneAndDelete({
      _id: transactionId,
      user: userId,
    });

  if (!transaction) {
    throw new Error(
      "Transaction not found"
    );
  }

  return transaction;
};

module.exports = {
  createTransaction,
  getTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
};