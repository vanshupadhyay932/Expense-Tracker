const { body } = require("express-validator");

/**
 * Add Transaction Validation
 */
const transactionValidator = [
  body("type")
    .trim()
    .notEmpty()
    .withMessage("Transaction type is required")
    .isIn(["income", "expense"])
    .withMessage("Type must be either income or expense"),

  body("category")
    .trim()
    .notEmpty()
    .withMessage("Category is required"),

  body("amount")
    .notEmpty()
    .withMessage("Amount is required")
    .isFloat({ gt: 0 })
    .withMessage("Amount must be greater than 0"),

  body("description")
    .optional()
    .trim(),

  body("date")
    .optional()
    .isISO8601()
    .withMessage("Invalid date format"),
];

module.exports = transactionValidator;