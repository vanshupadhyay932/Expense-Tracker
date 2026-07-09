/**
 * ===========================================================
 * report.test.js
 * ===========================================================
 * Report API Integration Testing
 *
 * Technologies
 * ------------
 * • Jest
 * • Supertest
 * • MongoDB Memory Server
 *
 * Tests
 * -----
 * ✓ Summary Report
 * ✓ Monthly Report
 * ✓ Category Report
 * ✓ Authentication
 * ✓ Dashboard Calculations
 * ===========================================================
 */

const request = require("supertest");

const mongoose = require("mongoose");

const {
  MongoMemoryServer,
} = require("mongodb-memory-server");

const app = require("../server");

const User = require("../src/models/User");

const Transaction = require(
  "../src/models/Transaction"
);

let mongoServer;

let token;

let userId;

/**
 * ===========================================================
 * Start Memory Database
 * ===========================================================
 */
beforeAll(async () => {

  mongoServer =
    await MongoMemoryServer.create();

  const uri =
    mongoServer.getUri();

  await mongoose.disconnect();

  await mongoose.connect(uri);

});

/**
 * ===========================================================
 * Prepare Test Data
 * ===========================================================
 */
beforeEach(async () => {

  await User.deleteMany({});

  await Transaction.deleteMany({});

  /**
   * Register Test User
   */
  const registerResponse =
    await request(app)

      .post("/api/auth/register")

      .send({

        name: "Vansh",

        email: "vansh@gmail.com",

        password: "Password1",

      });

  token =
    registerResponse.body.data.token;

  userId =
    registerResponse.body.data.user.id;

  /**
   * Income Transaction
   */
  await Transaction.create({

    user: userId,

    type: "income",

    category: "Salary",

    amount: 50000,

    description: "Monthly Salary",

    date: new Date(),

  });

  /**
   * Expense Transaction
   */
  await Transaction.create({

    user: userId,

    type: "expense",

    category: "Food",

    amount: 500,

    description: "Lunch",

    date: new Date(),

  });

  /**
   * Expense Transaction
   */
  await Transaction.create({

    user: userId,

    type: "expense",

    category: "Travel",

    amount: 1500,

    description: "Bus Ticket",

    date: new Date(),

  });

});

/**
 * ===========================================================
 * Close Database
 * ===========================================================
 */
afterAll(async () => {

  await mongoose.connection.dropDatabase();

  await mongoose.connection.close();

  await mongoServer.stop();

});
/**
 * ===========================================================
 * Summary Report Tests
 * ===========================================================
 */

describe("GET /api/reports/summary", () => {

  /**
   * Get Summary Report Successfully
   */
  test(
    "should return summary report",
    async () => {

      const response =
        await request(app)

          .get("/api/reports/summary")

          .set(
            "Authorization",
            `Bearer ${token}`
          );

      expect(response.statusCode)
        .toBe(200);

      expect(response.body.success)
        .toBe(true);

      expect(response.body.data)
        .toHaveProperty("totalIncome");

      expect(response.body.data)
        .toHaveProperty("totalExpense");

      expect(response.body.data)
        .toHaveProperty("balance");

      expect(response.body.data)
        .toHaveProperty("totalTransactions");

    }
  );

  /**
   * Verify Total Income
   */
  test(
    "should calculate total income correctly",
    async () => {

      const response =
        await request(app)

          .get("/api/reports/summary")

          .set(
            "Authorization",
            `Bearer ${token}`
          );

      expect(response.body.data.totalIncome)
        .toBe(50000);

    }
  );

  /**
   * Verify Total Expense
   */
  test(
    "should calculate total expense correctly",
    async () => {

      const response =
        await request(app)

          .get("/api/reports/summary")

          .set(
            "Authorization",
            `Bearer ${token}`
          );

      expect(response.body.data.totalExpense)
        .toBe(2000);

    }
  );

  /**
   * Verify Balance
   */
  test(
    "should calculate balance correctly",
    async () => {

      const response =
        await request(app)

          .get("/api/reports/summary")

          .set(
            "Authorization",
            `Bearer ${token}`
          );

      expect(response.body.data.balance)
        .toBe(48000);

    }
  );

  /**
   * Verify Total Transactions
   */
  test(
    "should return total transaction count",
    async () => {

      const response =
        await request(app)

          .get("/api/reports/summary")

          .set(
            "Authorization",
            `Bearer ${token}`
          );

      expect(
        response.body.data.totalTransactions
      ).toBe(3);

    }
  );

  /**
   * Unauthorized Request
   */
  test(
    "should reject request without token",
    async () => {

      const response =
        await request(app)

          .get("/api/reports/summary");

      expect(response.statusCode)
        .toBe(401);

      expect(response.body.success)
        .toBe(false);

    }
  );

});
/**
 * ===========================================================
 * Monthly Report Tests
 * ===========================================================
 */

describe("GET /api/reports/monthly", () => {

  /**
   * Get Monthly Report Successfully
   */
  test(
    "should return monthly report",
    async () => {

      const response =
        await request(app)

          .get("/api/reports/monthly")

          .set(
            "Authorization",
            `Bearer ${token}`
          );

      expect(response.statusCode)
        .toBe(200);

      expect(response.body.success)
        .toBe(true);

      expect(response.body.data)
        .toBeDefined();

    }
  );

  /**
   * Monthly Report Should Be Object
   */
  test(
    "should return an object",
    async () => {

      const response =
        await request(app)

          .get("/api/reports/monthly")

          .set(
            "Authorization",
            `Bearer ${token}`
          );

      expect(
        typeof response.body.data
      ).toBe("object");

    }
  );

  /**
   * Should Contain Current Month
   */
  test(
    "should contain current month entry",
    async () => {

      const response =
        await request(app)

          .get("/api/reports/monthly")

          .set(
            "Authorization",
            `Bearer ${token}`
          );

      const currentMonth =
        new Date().toLocaleString(
          "default",
          {
            month: "long",
            year: "numeric",
          }
        );

      expect(
        response.body.data[currentMonth]
      ).toBeDefined();

    }
  );

  /**
   * Verify Income
   */
  test(
    "should calculate monthly income",
    async () => {

      const response =
        await request(app)

          .get("/api/reports/monthly")

          .set(
            "Authorization",
            `Bearer ${token}`
          );

      const currentMonth =
        new Date().toLocaleString(
          "default",
          {
            month: "long",
            year: "numeric",
          }
        );

      expect(
        response.body.data[currentMonth]
          .income
      ).toBe(50000);

    }
  );

  /**
   * Verify Expense
   */
  test(
    "should calculate monthly expense",
    async () => {

      const response =
        await request(app)

          .get("/api/reports/monthly")

          .set(
            "Authorization",
            `Bearer ${token}`
          );

      const currentMonth =
        new Date().toLocaleString(
          "default",
          {
            month: "long",
            year: "numeric",
          }
        );

      expect(
        response.body.data[currentMonth]
          .expense
      ).toBe(2000);

    }
  );

  /**
   * Unauthorized Request
   */
  test(
    "should reject monthly report without JWT",
    async () => {

      const response =
        await request(app)

          .get("/api/reports/monthly");

      expect(response.statusCode)
        .toBe(401);

      expect(response.body.success)
        .toBe(false);

    }
  );

});
/**
 * ===========================================================
 * Category Report Tests
 * ===========================================================
 */

describe("GET /api/reports/category", () => {

  /**
   * Get Category Report
   */
  test(
    "should return category wise expenses",
    async () => {

      const response =
        await request(app)

          .get("/api/reports/category")

          .set(
            "Authorization",
            `Bearer ${token}`
          );

      expect(response.statusCode)
        .toBe(200);

      expect(response.body.success)
        .toBe(true);

      expect(response.body.data)
        .toHaveProperty("Food");

      expect(response.body.data)
        .toHaveProperty("Travel");

    }
  );

  /**
   * Food Category Total
   */
  test(
    "should calculate Food expenses",
    async () => {

      const response =
        await request(app)

          .get("/api/reports/category")

          .set(
            "Authorization",
            `Bearer ${token}`
          );

      expect(
        response.body.data.Food
      ).toBe(500);

    }
  );

  /**
   * Travel Category Total
   */
  test(
    "should calculate Travel expenses",
    async () => {

      const response =
        await request(app)

          .get("/api/reports/category")

          .set(
            "Authorization",
            `Bearer ${token}`
          );

      expect(
        response.body.data.Travel
      ).toBe(1500);

    }
  );

  /**
   * Unauthorized Access
   */
  test(
    "should reject request without JWT",
    async () => {

      const response =
        await request(app)

          .get("/api/reports/category");

      expect(response.statusCode)
        .toBe(401);

      expect(response.body.success)
        .toBe(false);

    }
  );

});

/**
 * ===========================================================
 * Edge Cases
 * ===========================================================
 */

describe("Report Edge Cases", () => {

  /**
   * Empty Database
   */
  test(
    "should return zero values when no transactions exist",
    async () => {

      await Transaction.deleteMany({});

      const response =
        await request(app)

          .get("/api/reports/summary")

          .set(
            "Authorization",
            `Bearer ${token}`
          );

      expect(response.statusCode)
        .toBe(200);

      expect(response.body.data.totalIncome)
        .toBe(0);

      expect(response.body.data.totalExpense)
        .toBe(0);

      expect(response.body.data.balance)
        .toBe(0);

      expect(response.body.data.totalTransactions)
        .toBe(0);

    }
  );

  /**
   * Database Verification
   */
  test(
    "should contain exactly three transactions",
    async () => {

      const count =
        await Transaction.countDocuments({

          user: userId,

        });

      expect(count)
        .toBe(3);

    }
  );

  /**
   * Verify Balance Formula
   */
  test(
    "balance should equal income minus expense",
    async () => {

      const response =
        await request(app)

          .get("/api/reports/summary")

          .set(
            "Authorization",
            `Bearer ${token}`
          );

      expect(

        response.body.data.balance

      ).toBe(

        response.body.data.totalIncome -

        response.body.data.totalExpense

      );

    }
  );

});