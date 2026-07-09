const Transaction = require("../models/Transaction");

/**
 * ===========================================================
 * Summary Report
 * ===========================================================
 */
const getSummaryReport = async (userId) => {

  const transactions =
    await Transaction.find({
      user: userId,
    });

  let totalIncome = 0;

  let totalExpense = 0;

  transactions.forEach((transaction) => {

    if (transaction.type === "income") {

      totalIncome += transaction.amount;

    } else {

      totalExpense += transaction.amount;

    }

  });

  return {

    totalIncome,

    totalExpense,

    balance:
      totalIncome - totalExpense,

    totalTransactions:
      transactions.length,

  };

};

/**
 * ===========================================================
 * Monthly Report
 * ===========================================================
 */
const getMonthlyReport = async (userId) => {

  const transactions =
    await Transaction.find({
      user: userId,
    });

  const monthlyReport = {};

  transactions.forEach((transaction) => {

    const month =
      transaction.date.toLocaleString(
        "default",
        {
          month: "long",
          year: "numeric",
        }
      );

    if (!monthlyReport[month]) {

      monthlyReport[month] = {

        income: 0,

        expense: 0,

      };

    }

    if (transaction.type === "income") {

      monthlyReport[month].income +=
        transaction.amount;

    } else {

      monthlyReport[month].expense +=
        transaction.amount;

    }

  });

  return monthlyReport;

};

/**
 * ===========================================================
 * Category Report
 * ===========================================================
 */
const getCategoryReport = async (userId) => {

  const transactions =
    await Transaction.find({
      user: userId,
      type: "expense",
    });

  const categories = {};

  transactions.forEach((transaction) => {

    if (!categories[transaction.category]) {

      categories[transaction.category] = 0;

    }

    categories[transaction.category] +=
      transaction.amount;

  });

  return categories;

};

module.exports = {

  getSummaryReport,

  getMonthlyReport,

  getCategoryReport,

};