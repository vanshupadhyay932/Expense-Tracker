/**
 * ===========================================================
 * transaction.test.js
 * ===========================================================
 * Transaction API Testing
 *
 * Technologies
 * ------------
 * • Jest
 * • Supertest
 * • MongoDB Memory Server
 *
 * Tests
 * -----
 * ✓ Create Transaction
 * ✓ Get Transactions
 * ✓ Get Single Transaction
 * ✓ Update Transaction
 * ✓ Delete Transaction
 * ✓ Authentication
 * ✓ Validation
 * ===========================================================
 */

const request = require("supertest");

const mongoose = require("mongoose");

const { MongoMemoryServer } = require(
  "mongodb-memory-server"
);

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
 * Clean Database
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
 * Create Transaction Tests
 * ===========================================================
 */

describe("POST /api/transactions", () => {

  /**
   * Create Transaction Successfully
   */
  test(
    "should create a new transaction",
    async () => {

      const response =
        await request(app)

          .post("/api/transactions")

          .set(
            "Authorization",
            `Bearer ${token}`
          )

          .send({

            type: "expense",

            category: "Food",

            amount: 250,

            description: "Burger",

          });

      expect(response.statusCode)
        .toBe(201);

      expect(response.body.success)
        .toBe(true);

      expect(response.body.message)
        .toBe(
          "Transaction created successfully"
        );

      expect(response.body.data.type)
        .toBe("expense");

      expect(response.body.data.category)
        .toBe("Food");

      expect(response.body.data.amount)
        .toBe(250);

    }
  );

  /**
   * Unauthorized User
   */
  test(
    "should reject request without token",
    async () => {

      const response =
        await request(app)

          .post("/api/transactions")

          .send({

            type: "expense",

            category: "Food",

            amount: 300,

          });

      expect(response.statusCode)
        .toBe(401);

      expect(response.body.success)
        .toBe(false);

    }
  );

  /**
   * Invalid Transaction Type
   */
  test(
    "should reject invalid transaction type",
    async () => {

      const response =
        await request(app)

          .post("/api/transactions")

          .set(
            "Authorization",
            `Bearer ${token}`
          )

          .send({

            type: "shopping",

            category: "Food",

            amount: 200,

          });

      expect(response.statusCode)
        .toBe(400);

    }
  );

  /**
   * Invalid Amount
   */
  test(
    "should reject amount less than zero",
    async () => {

      const response =
        await request(app)

          .post("/api/transactions")

          .set(
            "Authorization",
            `Bearer ${token}`
          )

          .send({

            type: "expense",

            category: "Food",

            amount: -100,

          });

      expect(response.statusCode)
        .toBe(400);

    }
  );

  /**
   * Missing Category
   */
  test(
    "should reject missing category",
    async () => {

      const response =
        await request(app)

          .post("/api/transactions")

          .set(
            "Authorization",
            `Bearer ${token}`
          )

          .send({

            type: "expense",

            amount: 500,

          });

      expect(response.statusCode)
        .toBe(400);

    }
  );

  /**
   * Verify Database Entry
   */
  test(
    "should save transaction into database",
    async () => {

      await request(app)

        .post("/api/transactions")

        .set(
          "Authorization",
          `Bearer ${token}`
        )

        .send({

          type: "income",

          category: "Salary",

          amount: 50000,

          description: "June Salary",

        });

      const transaction =
        await Transaction.findOne({

          user: userId,

        });

      expect(transaction)
        .not.toBeNull();

      expect(transaction.type)
        .toBe("income");

      expect(transaction.amount)
        .toBe(50000);

    }
  );

});
/**
 * ===========================================================
 * Get Transaction Tests
 * ===========================================================
 */

describe("GET /api/transactions", () => {

  /**
   * Get All Transactions
   */
  test(
    "should return all user transactions",
    async () => {

      // Create First Transaction
      await request(app)

        .post("/api/transactions")

        .set(
          "Authorization",
          `Bearer ${token}`
        )

        .send({

          type: "income",

          category: "Salary",

          amount: 50000,

          description: "Monthly Salary",

        });

      // Create Second Transaction
      await request(app)

        .post("/api/transactions")

        .set(
          "Authorization",
          `Bearer ${token}`
        )

        .send({

          type: "expense",

          category: "Food",

          amount: 300,

          description: "Burger",

        });

      const response =
        await request(app)

          .get("/api/transactions")

          .set(
            "Authorization",
            `Bearer ${token}`
          );

      expect(response.statusCode)
        .toBe(200);

      expect(response.body.success)
        .toBe(true);

      expect(response.body.data.length)
        .toBe(2);

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

          .get("/api/transactions");

      expect(response.statusCode)
        .toBe(401);

      expect(response.body.success)
        .toBe(false);

    }
  );

});

/**
 * ===========================================================
 * Get Single Transaction
 * ===========================================================
 */

describe("GET /api/transactions/:id", () => {

  test(
    "should return one transaction",
    async () => {

      const created =
        await request(app)

          .post("/api/transactions")

          .set(
            "Authorization",
            `Bearer ${token}`
          )

          .send({

            type: "expense",

            category: "Travel",

            amount: 1200,

            description: "Bus Ticket",

          });

      const transactionId =
        created.body.data._id;

      const response =
        await request(app)

          .get(
            `/api/transactions/${transactionId}`
          )

          .set(
            "Authorization",
            `Bearer ${token}`
          );

      expect(response.statusCode)
        .toBe(200);

      expect(response.body.success)
        .toBe(true);

      expect(response.body.data.amount)
        .toBe(1200);

      expect(response.body.data.category)
        .toBe("Travel");

    }
  );

  /**
   * Invalid MongoDB ID
   */
  test(
    "should reject invalid transaction id",
    async () => {

      const response =
        await request(app)

          .get(
            "/api/transactions/12345"
          )

          .set(
            "Authorization",
            `Bearer ${token}`
          );

      expect(response.body.success)
        .toBe(false);

    }
  );

  /**
   * Transaction Not Found
   */
  test(
    "should return transaction not found",
    async () => {

      const fakeId =
        new mongoose.Types.ObjectId();

      const response =
        await request(app)

          .get(
            `/api/transactions/${fakeId}`
          )

          .set(
            "Authorization",
            `Bearer ${token}`
          );

      expect(response.body.success)
        .toBe(false);

    }
  );

  /**
   * Unauthorized Access
   */
  test(
    "should reject request without token",
    async () => {

      const fakeId =
        new mongoose.Types.ObjectId();

      const response =
        await request(app)

          .get(
            `/api/transactions/${fakeId}`
          );

      expect(response.statusCode)
        .toBe(401);

    }
  );

});
/**
 * ===========================================================
 * Update Transaction Tests
 * ===========================================================
 */

describe("PUT /api/transactions/:id", () => {

  test(
    "should update transaction successfully",
    async () => {

      // Create Transaction
      const created =
        await request(app)

          .post("/api/transactions")

          .set(
            "Authorization",
            `Bearer ${token}`
          )

          .send({

            type: "expense",

            category: "Food",

            amount: 250,

            description: "Burger",

          });

      const transactionId =
        created.body.data._id;

      // Update Transaction
      const response =
        await request(app)

          .put(
            `/api/transactions/${transactionId}`
          )

          .set(
            "Authorization",
            `Bearer ${token}`
          )

          .send({

            type: "expense",

            category: "Travel",

            amount: 500,

            description: "Bus Ticket",

          });

      expect(response.statusCode)
        .toBe(200);

      expect(response.body.success)
        .toBe(true);

      expect(response.body.message)
        .toBe(
          "Transaction updated successfully"
        );

      expect(response.body.data.category)
        .toBe("Travel");

      expect(response.body.data.amount)
        .toBe(500);

    }
  );

  /**
   * Invalid Update Data
   */
  test(
    "should reject invalid update data",
    async () => {

      const created =
        await request(app)

          .post("/api/transactions")

          .set(
            "Authorization",
            `Bearer ${token}`
          )

          .send({

            type: "income",

            category: "Salary",

            amount: 50000,

          });

      const transactionId =
        created.body.data._id;

      const response =
        await request(app)

          .put(
            `/api/transactions/${transactionId}`
          )

          .set(
            "Authorization",
            `Bearer ${token}`
          )

          .send({

            type: "expense",

            category: "",

            amount: -50,

          });

      expect(response.statusCode)
        .toBe(400);

    }
  );

  /**
   * Transaction Not Found
   */
  test(
    "should reject invalid transaction id",
    async () => {

      const fakeId =
        new mongoose.Types.ObjectId();

      const response =
        await request(app)

          .put(
            `/api/transactions/${fakeId}`
          )

          .set(
            "Authorization",
            `Bearer ${token}`
          )

          .send({

            type: "expense",

            category: "Food",

            amount: 100,

          });

      expect(response.body.success)
        .toBe(false);

    }
  );

  /**
   * Unauthorized Update
   */
  test(
    "should reject update without token",
    async () => {

      const fakeId =
        new mongoose.Types.ObjectId();

      const response =
        await request(app)

          .put(
            `/api/transactions/${fakeId}`
          )

          .send({

            type: "expense",

            category: "Food",

            amount: 100,

          });

      expect(response.statusCode)
        .toBe(401);

    }
  );

});

/**
 * ===========================================================
 * Delete Transaction Tests
 * ===========================================================
 */

describe("DELETE /api/transactions/:id", () => {

  test(
    "should delete transaction successfully",
    async () => {

      const created =
        await request(app)

          .post("/api/transactions")

          .set(
            "Authorization",
            `Bearer ${token}`
          )

          .send({

            type: "expense",

            category: "Food",

            amount: 200,

          });

      const transactionId =
        created.body.data._id;

      const response =
        await request(app)

          .delete(
            `/api/transactions/${transactionId}`
          )

          .set(
            "Authorization",
            `Bearer ${token}`
          );

      expect(response.statusCode)
        .toBe(200);

      expect(response.body.success)
        .toBe(true);

      expect(response.body.message)
        .toBe(
          "Transaction deleted successfully"
        );

    }
  );

  /**
   * Verify Transaction Removed
   */
  test(
    "should remove transaction from database",
    async () => {

      const created =
        await request(app)

          .post("/api/transactions")

          .set(
            "Authorization",
            `Bearer ${token}`
          )

          .send({

            type: "expense",

            category: "Food",

            amount: 300,

          });

      const transactionId =
        created.body.data._id;

      await request(app)

        .delete(
          `/api/transactions/${transactionId}`
        )

        .set(
          "Authorization",
          `Bearer ${token}`
        );

      const transaction =
        await Transaction.findById(
          transactionId
        );

      expect(transaction)
        .toBeNull();

    }
  );

  /**
   * Delete Without Token
   */
  test(
    "should reject delete without token",
    async () => {

      const fakeId =
        new mongoose.Types.ObjectId();

      const response =
        await request(app)

          .delete(
            `/api/transactions/${fakeId}`
          );

      expect(response.statusCode)
        .toBe(401);

    }
  );

});
/**
 * ===========================================================
 * Update Transaction Tests
 * ===========================================================
 */

describe("PUT /api/transactions/:id", () => {

  test(
    "should update transaction successfully",
    async () => {

      // Create Transaction
      const created =
        await request(app)

          .post("/api/transactions")

          .set(
            "Authorization",
            `Bearer ${token}`
          )

          .send({

            type: "expense",

            category: "Food",

            amount: 250,

            description: "Burger",

          });

      const transactionId =
        created.body.data._id;

      // Update Transaction
      const response =
        await request(app)

          .put(
            `/api/transactions/${transactionId}`
          )

          .set(
            "Authorization",
            `Bearer ${token}`
          )

          .send({

            type: "expense",

            category: "Travel",

            amount: 500,

            description: "Bus Ticket",

          });

      expect(response.statusCode)
        .toBe(200);

      expect(response.body.success)
        .toBe(true);

      expect(response.body.message)
        .toBe(
          "Transaction updated successfully"
        );

      expect(response.body.data.category)
        .toBe("Travel");

      expect(response.body.data.amount)
        .toBe(500);

    }
  );

  /**
   * Invalid Update Data
   */
  test(
    "should reject invalid update data",
    async () => {

      const created =
        await request(app)

          .post("/api/transactions")

          .set(
            "Authorization",
            `Bearer ${token}`
          )

          .send({

            type: "income",

            category: "Salary",

            amount: 50000,

          });

      const transactionId =
        created.body.data._id;

      const response =
        await request(app)

          .put(
            `/api/transactions/${transactionId}`
          )

          .set(
            "Authorization",
            `Bearer ${token}`
          )

          .send({

            type: "expense",

            category: "",

            amount: -50,

          });

      expect(response.statusCode)
        .toBe(400);

    }
  );

  /**
   * Transaction Not Found
   */
  test(
    "should reject invalid transaction id",
    async () => {

      const fakeId =
        new mongoose.Types.ObjectId();

      const response =
        await request(app)

          .put(
            `/api/transactions/${fakeId}`
          )

          .set(
            "Authorization",
            `Bearer ${token}`
          )

          .send({

            type: "expense",

            category: "Food",

            amount: 100,

          });

      expect(response.body.success)
        .toBe(false);

    }
  );

  /**
   * Unauthorized Update
   */
  test(
    "should reject update without token",
    async () => {

      const fakeId =
        new mongoose.Types.ObjectId();

      const response =
        await request(app)

          .put(
            `/api/transactions/${fakeId}`
          )

          .send({

            type: "expense",

            category: "Food",

            amount: 100,

          });

      expect(response.statusCode)
        .toBe(401);

    }
  );

});

/**
 * ===========================================================
 * Delete Transaction Tests
 * ===========================================================
 */

describe("DELETE /api/transactions/:id", () => {

  test(
    "should delete transaction successfully",
    async () => {

      const created =
        await request(app)

          .post("/api/transactions")

          .set(
            "Authorization",
            `Bearer ${token}`
          )

          .send({

            type: "expense",

            category: "Food",

            amount: 200,

          });

      const transactionId =
        created.body.data._id;

      const response =
        await request(app)

          .delete(
            `/api/transactions/${transactionId}`
          )

          .set(
            "Authorization",
            `Bearer ${token}`
          );

      expect(response.statusCode)
        .toBe(200);

      expect(response.body.success)
        .toBe(true);

      expect(response.body.message)
        .toBe(
          "Transaction deleted successfully"
        );

    }
  );

  /**
   * Verify Transaction Removed
   */
  test(
    "should remove transaction from database",
    async () => {

      const created =
        await request(app)

          .post("/api/transactions")

          .set(
            "Authorization",
            `Bearer ${token}`
          )

          .send({

            type: "expense",

            category: "Food",

            amount: 300,

          });

      const transactionId =
        created.body.data._id;

      await request(app)

        .delete(
          `/api/transactions/${transactionId}`
        )

        .set(
          "Authorization",
          `Bearer ${token}`
        );

      const transaction =
        await Transaction.findById(
          transactionId
        );

      expect(transaction)
        .toBeNull();

    }
  );

  /**
   * Delete Without Token
   */
  test(
    "should reject delete without token",
    async () => {

      const fakeId =
        new mongoose.Types.ObjectId();

      const response =
        await request(app)

          .delete(
            `/api/transactions/${fakeId}`
          );

      expect(response.statusCode)
        .toBe(401);

    }
  );

});