const express = require("express");

const router = express.Router();

const {
  create,
  getAll,
  getOne,
  update,
  remove,
} = require("../controllers/transactionController");

const transactionValidator = require(
  "../validators/transactionValidator"
);

const validateMiddleware = require(
  "../middleware/validateMiddleware"
);

const authMiddleware = require(
  "../middleware/authMiddleware"
);

/**
 * Create Transaction
 * POST /api/transactions
 */
router.post(
  "/",
  authMiddleware,
  transactionValidator,
  validateMiddleware,
  create
);

/**
 * Get All Transactions
 * GET /api/transactions
 */
router.get(
  "/",
  authMiddleware,
  getAll
);

/**
 * Get Single Transaction
 * GET /api/transactions/:id
 */
router.get(
  "/:id",
  authMiddleware,
  getOne
);

/**
 * Update Transaction
 * PUT /api/transactions/:id
 */
router.put(
  "/:id",
  authMiddleware,
  transactionValidator,
  validateMiddleware,
  update
);

/**
 * Delete Transaction
 * DELETE /api/transactions/:id
 */
router.delete(
  "/:id",
  authMiddleware,
  remove
);

module.exports = router;