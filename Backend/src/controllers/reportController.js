const {
  getSummaryReport,
  getMonthlyReport,
  getCategoryReport,
} = require("../services/reportService");

/**
 * Summary Report
 */
const summary = async (req, res, next) => {
  try {

    const report = await getSummaryReport(
      req.user._id
    );

    res.status(200).json({
      success: true,
      data: report,
    });

  } catch (error) {

    next(error);

  }
};

/**
 * Monthly Report
 */
const monthly = async (req, res, next) => {
  try {

    const report = await getMonthlyReport(
      req.user._id
    );

    res.status(200).json({
      success: true,
      data: report,
    });

  } catch (error) {

    next(error);

  }
};

/**
 * Category Report
 */
const category = async (req, res, next) => {
  try {

    const report = await getCategoryReport(
      req.user._id
    );

    res.status(200).json({
      success: true,
      data: report,
    });

  } catch (error) {

    next(error);

  }
};

module.exports = {
  summary,
  monthly,
  category,
};