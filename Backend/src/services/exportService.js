const Transaction = require("../models/Transaction");

const csvExporter = require("../utils/csvExporter");

const pdfExporter = require("../utils/pdfExporter");

/**
 * Export Transactions as CSV
 */
const exportCSV = async (userId) => {
  const transactions =
    await Transaction.find({
      user: userId,
    }).sort({
      date: -1,
    });

  return csvExporter(transactions);
};

/**
 * Export Transactions as PDF
 */
const exportPDF = async (userId) => {
  const transactions =
    await Transaction.find({
      user: userId,
    }).sort({
      date: -1,
    });

  return pdfExporter(transactions);
};

module.exports = {
  exportCSV,
  exportPDF,
};