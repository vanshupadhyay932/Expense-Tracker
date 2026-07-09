const {
  createTransaction,
  getTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
} = require("../services/transactionService");

/**
 * Create Transaction
 */
const create = async (
  req,
  res,
  next
) => {
  try {

    const transaction =
      await createTransaction(
        req.user._id,
        req.body
      );

    res.status(201).json({
      success: true,
      message: "Transaction created successfully",
      data: transaction,
    });

  } catch (error) {

    next(error);

  }
};

/**
 * Get All Transactions
 */
const getAll = async (
  req,
  res,
  next
) => {
  try {

    const transactions =
      await getTransactions(
        req.user._id
      );

    res.status(200).json({
      success: true,
      data: transactions,
    });

  } catch (error) {

    next(error);

  }
};

/**
 * Get Single Transaction
 */
const getOne = async (
  req,
  res,
  next
) => {
  try {

    const transaction =
      await getTransactionById(
        req.params.id,
        req.user._id
      );

    res.status(200).json({
      success: true,
      data: transaction,
    });

  } catch (error) {

    next(error);

  }
};

/**
 * Update Transaction
 */
const update = async (
  req,
  res,
  next
) => {
  try {

    const transaction =
      await updateTransaction(
        req.params.id,
        req.user._id,
        req.body
      );

    res.status(200).json({
      success: true,
      message: "Transaction updated successfully",
      data: transaction,
    });

  } catch (error) {

    next(error);

  }
};

/**
 * Delete Transaction
 */
const remove = async (
  req,
  res,
  next
) => {
  try {

    const transaction =
      await deleteTransaction(
        req.params.id,
        req.user._id
      );

    res.status(200).json({
      success: true,
      message: "Transaction deleted successfully",
      data: transaction,
    });

  } catch (error) {

    next(error);

  }
};

module.exports = {
  create,
  getAll,
  getOne,
  update,
  remove,
};