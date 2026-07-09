/**
 * ---------------------------------------------------------
 * Load Environment Variables
 * ---------------------------------------------------------
 * dotenv reads the .env file and loads all the variables
 * into process.env.
 *
 * Example:
 * PORT=5000
 * MONGO_URI=...
 * JWT_SECRET=...
 */
require("dotenv").config();

/**
 * ---------------------------------------------------------
 * Import Third-Party Packages
 * ---------------------------------------------------------
 */
const express = require("express");
const cors = require("cors");

/**
 * ---------------------------------------------------------
 * Import Database Connection
 * ---------------------------------------------------------
 */
const connectDB = require("./src/config/db");

/**
 * ---------------------------------------------------------
 * Import Routes
 * ---------------------------------------------------------
 */
const authRoutes = require("./src/routes/authRoutes");
const transactionRoutes = require("./src/routes/transactionRoutes");
const reportRoutes = require("./src/routes/reportRoutes");
const exportRoutes = require("./src/routes/exportRoutes");

/**
 * ---------------------------------------------------------
 * Import Global Error Middleware
 * ---------------------------------------------------------
 */
const errorMiddleware = require(
  "./src/middleware/errorMiddleware"
);

/**
 * ---------------------------------------------------------
 * Connect MongoDB
 * ---------------------------------------------------------
 * This establishes the connection between our backend
 * and MongoDB Atlas before the server starts.
 */
connectDB();

/**
 * ---------------------------------------------------------
 * Create Express Application
 * ---------------------------------------------------------
 * express() returns an Express application object.
 * This object controls the entire backend.
 */
const app = express();

/**
 * ---------------------------------------------------------
 * Global Middlewares
 * ---------------------------------------------------------
 */

/**
 * Allow requests from different origins.
 * Example:
 * React -> localhost:5173
 * Backend -> localhost:5000
 */
app.use(cors());

/**
 * Parse JSON request body.
 *
 * Without this:
 * req.body = undefined
 */
app.use(express.json());

/**
 * Parse URL Encoded Form Data.
 *
 * Used for HTML forms.
 */
app.use(
  express.urlencoded({
    extended: true,
  })
);

/**
 * ---------------------------------------------------------
 * Register Routes
 * ---------------------------------------------------------
 */

/**
 * Authentication Routes
 *
 * Base URL:
 * /api/auth
 */
app.use(
  "/api/auth",
  authRoutes
);

/**
 * Transaction Routes
 *
 * Base URL:
 * /api/transactions
 */
app.use(
  "/api/transactions",
  transactionRoutes
);

/**
 * Report Routes
 *
 * Base URL:
 * /api/reports
 */
app.use(
  "/api/reports",
  reportRoutes
);

/**
 * Export Routes
 *
 * Base URL:
 * /api/export
 */
app.use(
  "/api/export",
  exportRoutes
);

/**
 * ---------------------------------------------------------
 * Home Route
 * ---------------------------------------------------------
 *
 * Used to verify that the backend is running.
 *
 * GET /
 */
app.get("/", (req, res) => {

  res.status(200).json({

    success: true,

    message:
      "Expense Tracker Backend Running",

  });

});

/**
 * ---------------------------------------------------------
 * Global Error Handler
 * ---------------------------------------------------------
 *
 * This MUST always be the last middleware.
 *
 * Every error from the application eventually
 * reaches this middleware.
 */
app.use(errorMiddleware);

/**
 * ---------------------------------------------------------
 * Server Port
 * ---------------------------------------------------------
 */
const PORT =
process.env.PORT || 5000;

/**
 * ---------------------------------------------------------
 * Start Server
 * ---------------------------------------------------------
 *
 * require.main === module
 *
 * Meaning:
 *
 * If this file is executed directly:
 *
 * node server.js
 *
 * Then start the server.
 *
 * But if this file is imported
 * inside another file (for example Jest),
 * DO NOT start the server.
 *
 * This prevents:
 *
 * • Multiple servers starting
 * • Port already in use errors
 * • Jest test failures
 */
if (require.main === module) {

  app.listen(PORT, () => {

    console.log(
      `🚀 Server running on http://localhost:${PORT}`
    );

  });

}

/**
 * ---------------------------------------------------------
 * Export Express Application
 * ---------------------------------------------------------
 *
 * This allows Jest and Supertest
 * to import the Express app without
 * starting the server.
 */
module.exports = app;