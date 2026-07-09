const express = require("express");

const router = express.Router();

const {
  register,
  login,
} = require("../controllers/authController");

const {
  registerValidator,
  loginValidator,
} = require("../validators/authValidator");

const validateMiddleware = require("../middleware/validateMiddleware");

/**
 * Register User
 * POST /api/auth/register
 */
router.post(
  "/register",
  registerValidator,
  validateMiddleware,
  register
);

/**
 * Login User
 * POST /api/auth/login
 */
router.post(
  "/login",
  loginValidator,
  validateMiddleware,
  login
);

module.exports = router;