const {
  exportCSV,
  exportPDF,
} = require("../services/exportService");

/**
 * ===========================================================
 * Export Transactions as CSV
 * ===========================================================
 */
const csv = async (
  req,
  res,
  next
) => {

  try {

    await exportCSV(
      req.user._id,
      res
    );

  } catch (error) {

    next(error);

  }

};

/**
 * ===========================================================
 * Export Transactions as PDF
 * ===========================================================
 */
const pdf = async (
  req,
  res,
  next
) => {

  try {

    await exportPDF(
      req.user._id,
      res
    );

  } catch (error) {

    next(error);

  }

};

module.exports = {

  csv,

  pdf,

};