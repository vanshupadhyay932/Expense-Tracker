/**
 * ---------------------------------------------------------
 * Configure DNS
 * ---------------------------------------------------------
 *
 * Node.js was unable to resolve the MongoDB Atlas SRV
 * record using the default DNS resolver.
 *
 * We tested Google's DNS directly and confirmed that it
 * successfully resolves the MongoDB Atlas SRV records.
 *
 * Therefore, configure Node.js to use:
 *
 * 8.8.8.8  -> Google DNS
 * 1.1.1.1  -> Cloudflare DNS
 *
 * IMPORTANT:
 * This must be configured BEFORE MongoDB/Mongoose is
 * imported or used.
 */

const dns = require("dns");

dns.setServers([
  "8.8.8.8",
  "1.1.1.1"
]);


/**
 * ---------------------------------------------------------
 * Load Environment Variables
 * ---------------------------------------------------------
 *
 * dotenv reads the .env file and loads all the variables
 * into process.env.
 *
 * Example:
 *
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

const transactionRoutes = require(
  "./src/routes/transactionRoutes"
);

const reportRoutes = require(
  "./src/routes/reportRoutes"
);

const exportRoutes = require(
  "./src/routes/exportRoutes"
);


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
 * Create Express Application
 * ---------------------------------------------------------
 *
 * express() returns an Express application object.
 *
 * This object controls:
 *
 * - Routes
 * - Middleware
 * - Requests
 * - Responses
 */

const app = express();


/**
 * ---------------------------------------------------------
 * Global Middlewares
 * ---------------------------------------------------------
 */


/**
 * Allow requests from different origins.
 *
 * Example:
 *
 * React Frontend
 *      ↓
 * localhost:5173
 *
 * Backend
 *      ↓
 * localhost:5000
 */

app.use(cors());


/**
 * ---------------------------------------------------------
 * JSON Body Parser
 * ---------------------------------------------------------
 *
 * Allows Express to read JSON request bodies.
 *
 * Example:
 *
 * {
 *   "email": "user@gmail.com",
 *   "password": "123456"
 * }
 */

app.use(express.json());


/**
 * ---------------------------------------------------------
 * URL Encoded Body Parser
 * ---------------------------------------------------------
 *
 * Allows Express to read URL-encoded form data.
 */

app.use(
  express.urlencoded({
    extended: true,
  })
);


/**
 * ---------------------------------------------------------
 * Register Authentication Routes
 * ---------------------------------------------------------
 *
 * Base URL:
 *
 * /api/auth
 *
 * Examples:
 *
 * POST /api/auth/register
 * POST /api/auth/login
 */

app.use(
  "/api/auth",
  authRoutes
);


/**
 * ---------------------------------------------------------
 * Register Transaction Routes
 * ---------------------------------------------------------
 *
 * Base URL:
 *
 * /api/transactions
 */

app.use(
  "/api/transactions",
  transactionRoutes
);


/**
 * ---------------------------------------------------------
 * Register Report Routes
 * ---------------------------------------------------------
 *
 * Base URL:
 *
 * /api/reports
 */

app.use(
  "/api/reports",
  reportRoutes
);


/**
 * ---------------------------------------------------------
 * Register Export Routes
 * ---------------------------------------------------------
 *
 * Base URL:
 *
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
 *
 * URL:
 *
 * http://localhost:5000/
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
 * This MUST be registered after all routes.
 *
 * Errors from the application eventually reach
 * this middleware.
 */

app.use(errorMiddleware);


/**
 * ---------------------------------------------------------
 * Server Port
 * ---------------------------------------------------------
 *
 * Use PORT from .env.
 *
 * If PORT is not available,
 * use 5000.
 */

const PORT =
  process.env.PORT || 5000;


/**
 * ---------------------------------------------------------
 * Start Server
 * ---------------------------------------------------------
 *
 * MongoDB must connect successfully before the
 * Express server starts.
 */

const startServer = async () => {

  try {

    /**
     * -----------------------------------------------------
     * Connect to MongoDB
     * -----------------------------------------------------
     *
     * await waits for the MongoDB connection.
     *
     * If MongoDB connects successfully:
     *
     *     Continue to app.listen()
     *
     * If MongoDB fails:
     *
     *     Go to catch block.
     */

    await connectDB();


    /**
     * -----------------------------------------------------
     * Start Express Server
     * -----------------------------------------------------
     */

    app.listen(PORT, () => {

      console.log(
        `🚀 Server running on http://localhost:${PORT}`
      );

    });

  } catch (error) {

    /**
     * -----------------------------------------------------
     * Server Startup Error
     * -----------------------------------------------------
     */

    console.error(
      "❌ Server startup failed."
    );

    process.exit(1);

  }

};


/**
 * ---------------------------------------------------------
 * Start Application
 * ---------------------------------------------------------
 *
 * require.main === module means:
 *
 * Start the server only when this file is executed
 * directly.
 *
 * This prevents Jest/Supertest from automatically
 * starting the server when importing app.
 */

if (require.main === module) {

  startServer();

}


/**
 * ---------------------------------------------------------
 * Export Express Application
 * ---------------------------------------------------------
 *
 * This allows testing tools such as Jest/Supertest
 * to import the Express application without
 * automatically starting the server.
 */

module.exports = app;