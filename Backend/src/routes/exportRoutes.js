const express = require("express");

const router = express.Router();

const {
  csv,
  pdf,
} = require("../controllers/exportController");

const authMiddleware = require(
  "../middleware/authMiddleware"
);

/**
 * ===========================================================
 * Export Transactions as CSV
 * GET /api/export/csv
 * ===========================================================
 */
router.get(
  "/csv",
  authMiddleware,
  csv
);

/**
 * ===========================================================
 * Export Transactions as PDF
 * GET /api/export/pdf
 * ===========================================================
 */
router.get(
  "/pdf",
  authMiddleware,
  pdf
);

module.exports = router;