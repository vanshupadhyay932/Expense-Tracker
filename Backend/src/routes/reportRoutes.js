const express = require("express");

const router = express.Router();

const {
  summary,
  monthly,
  category,
} = require("../controllers/reportController");

const authMiddleware = require(
  "../middleware/authMiddleware"
);

/**
 * ===========================================================
 * Summary Report
 * GET /api/reports/summary
 * ===========================================================
 */
router.get(
  "/summary",
  authMiddleware,
  summary
);

/**
 * ===========================================================
 * Monthly Report
 * GET /api/reports/monthly
 * ===========================================================
 */
router.get(
  "/monthly",
  authMiddleware,
  monthly
);

/**
 * ===========================================================
 * Category Report
 * GET /api/reports/category
 * ===========================================================
 */
router.get(
  "/category",
  authMiddleware,
  category
);

module.exports = router;