/**
 * ===========================================================
 * auth.test.js
 * ===========================================================
 * Authentication API Testing
 *
 * Technologies Used:
 * - Jest
 * - Supertest
 * - MongoDB Memory Server
 *
 * This file tests:
 * ✓ User Registration
 * ✓ User Login
 * ✓ Authentication Validation
 * ✓ Error Handling
 * ===========================================================
 */

const request = require("supertest");

const mongoose = require("mongoose");

const { MongoMemoryServer } = require(
  "mongodb-memory-server"
);

const app = require("../server");

const User = require("../src/models/User");

let mongoServer;

/**
 * ===========================================================
 * Start Test Database
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
 * Clean Database Before Every Test
 * ===========================================================
 */
beforeEach(async () => {

  await User.deleteMany({});

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
 * Authentication Test Suite
 * ===========================================================
 */

describe("Authentication API", () => {

  /**
   * =======================================================
   * User Registration
   * =======================================================
   */

  describe("POST /api/auth/register", () => {

    /**
     * Register New User
     */
    test(
      "should register a new user successfully",
      async () => {

        const response =
          await request(app)

            .post("/api/auth/register")

            .send({

              name: "Vansh",

              email: "vansh@gmail.com",

              password: "Password1",

            });

        expect(response.statusCode)
          .toBe(201);

        expect(response.body.success)
          .toBe(true);

        expect(response.body.message)
          .toBe(
            "User registered successfully"
          );

        expect(response.body.data)
          .toHaveProperty("token");

        expect(response.body.data.user)
          .toHaveProperty("id");

        expect(response.body.data.user.name)
          .toBe("Vansh");

        expect(response.body.data.user.email)
          .toBe("vansh@gmail.com");

      }
    );

    /**
     * Duplicate Email
     */
    test(
      "should not register duplicate email",
      async () => {

        await request(app)

          .post("/api/auth/register")

          .send({

            name: "Vansh",

            email: "duplicate@gmail.com",

            password: "Password1",

          });

        const response =
          await request(app)

            .post("/api/auth/register")

            .send({

              name: "Another",

              email: "duplicate@gmail.com",

              password: "Password1",

            });

        expect(response.body.success)
          .toBe(false);

      }
    );

    /**
     * Missing Name
     */
    test(
      "should reject empty name",
      async () => {

        const response =
          await request(app)

            .post("/api/auth/register")

            .send({

              name: "",

              email: "user@gmail.com",

              password: "Password1",

            });

        expect(response.statusCode)
          .toBe(400);

      }
    );

    /**
     * Invalid Email
     */
    test(
      "should reject invalid email",
      async () => {

        const response =
          await request(app)

            .post("/api/auth/register")

            .send({

              name: "Vansh",

              email: "abcd",

              password: "Password1",

            });

        expect(response.statusCode)
          .toBe(400);

      }
    );

    /**
     * Empty Password
     */
    test(
      "should reject empty password",
      async () => {

        const response =
          await request(app)

            .post("/api/auth/register")

            .send({

              name: "Vansh",

              email: "user@gmail.com",

              password: "",

            });

        expect(response.statusCode)
          .toBe(400);

      }
    );

    /**
     * Weak Password
     */
    test(
      "should reject weak password",
      async () => {

        const response =
          await request(app)

            .post("/api/auth/register")

            .send({

              name: "Vansh",

              email: "user@gmail.com",

              password: "abc",

            });

        expect(response.statusCode)
          .toBe(400);

      }
    );

    /**
     * Password Stored Encrypted
     */
    test(
      "should hash password before saving",
      async () => {

        await request(app)

          .post("/api/auth/register")

          .send({

            name: "Hash Test",

            email: "hash@gmail.com",

            password: "Password1",

          });

        const user =
          await User.findOne({

            email: "hash@gmail.com",

          });

        expect(user).not.toBeNull();

        expect(user.password)
          .not.toBe("Password1");

      }
    );

  });

});
/**
 * =======================================================
 * User Login
 * =======================================================
 */

describe("POST /api/auth/login", () => {

  /**
   * Create Test User Before Every Login Test
   */
  beforeEach(async () => {

    await request(app)

      .post("/api/auth/register")

      .send({

        name: "Login User",

        email: "login@gmail.com",

        password: "Password1",

      });

  });

  /**
   * Login Successfully
   */
  test(
    "should login successfully with valid credentials",
    async () => {

      const response =
        await request(app)

          .post("/api/auth/login")

          .send({

            email: "login@gmail.com",

            password: "Password1",

          });

      expect(response.statusCode)
        .toBe(200);

      expect(response.body.success)
        .toBe(true);

      expect(response.body.message)
        .toBe("Login successful");

      expect(response.body.data)
        .toHaveProperty("token");

      expect(response.body.data.user.email)
        .toBe("login@gmail.com");

    }
  );

  /**
   * Wrong Password
   */
  test(
    "should reject incorrect password",
    async () => {

      const response =
        await request(app)

          .post("/api/auth/login")

          .send({

            email: "login@gmail.com",

            password: "WrongPassword",

          });

      expect(response.body.success)
        .toBe(false);

    }
  );

  /**
   * Unknown Email
   */
  test(
    "should reject unregistered email",
    async () => {

      const response =
        await request(app)

          .post("/api/auth/login")

          .send({

            email: "unknown@gmail.com",

            password: "Password1",

          });

      expect(response.body.success)
        .toBe(false);

    }
  );

  /**
   * Empty Email
   */
  test(
    "should reject empty email",
    async () => {

      const response =
        await request(app)

          .post("/api/auth/login")

          .send({

            email: "",

            password: "Password1",

          });

      expect(response.statusCode)
        .toBe(400);

    }
  );

  /**
   * Empty Password
   */
  test(
    "should reject empty password",
    async () => {

      const response =
        await request(app)

          .post("/api/auth/login")

          .send({

            email: "login@gmail.com",

            password: "",

          });

      expect(response.statusCode)
        .toBe(400);

    }
  );

  /**
   * Invalid Email Format
   */
  test(
    "should reject invalid email format",
    async () => {

      const response =
        await request(app)

          .post("/api/auth/login")

          .send({

            email: "abc",

            password: "Password1",

          });

      expect(response.statusCode)
        .toBe(400);

    }
  );

  /**
   * JWT Token Generated
   */
  test(
    "should return JWT token after login",
    async () => {

      const response =
        await request(app)

          .post("/api/auth/login")

          .send({

            email: "login@gmail.com",

            password: "Password1",

          });

      expect(response.body.data.token)
        .toBeDefined();

      expect(typeof response.body.data.token)
        .toBe("string");

    }
  );

  /**
   * Password Should Never Be Returned
   */
  test(
    "should not return password",
    async () => {

      const response =
        await request(app)

          .post("/api/auth/login")

          .send({

            email: "login@gmail.com",

            password: "Password1",

          });

      expect(response.body.data.user.password)
        .toBeUndefined();

    }
  );

});
/**
 * =======================================================
 * Additional Authentication Tests
 * =======================================================
 */

describe("Authentication Edge Cases", () => {

  /**
   * Email Should Be Stored Lowercase
   */
  test(
    "should store email in lowercase",
    async () => {

      await request(app)

        .post("/api/auth/register")

        .send({

          name: "Lowercase",

          email: "VANSH@GMAIL.COM",

          password: "Password1",

        });

      const user =
        await User.findOne({
          email: "vansh@gmail.com",
        });

      expect(user).not.toBeNull();

      expect(user.email)
        .toBe("vansh@gmail.com");

    }
  );

  /**
   * User Count Should Increase
   */
  test(
    "should create exactly one user",
    async () => {

      await request(app)

        .post("/api/auth/register")

        .send({

          name: "Count",

          email: "count@gmail.com",

          password: "Password1",

        });

      const count =
        await User.countDocuments();

      expect(count)
        .toBe(1);

    }
  );

  /**
   * Duplicate Registration
   * Should Not Increase Count
   */
  test(
    "duplicate registration should not create another user",
    async () => {

      await request(app)

        .post("/api/auth/register")

        .send({

          name: "First",

          email: "same@gmail.com",

          password: "Password1",

        });

      await request(app)

        .post("/api/auth/register")

        .send({

          name: "Second",

          email: "same@gmail.com",

          password: "Password1",

        });

      const count =
        await User.countDocuments();

      expect(count)
        .toBe(1);

    }
  );

  /**
   * Verify User Exists
   */
  test(
    "should save user into database",
    async () => {

      await request(app)

        .post("/api/auth/register")

        .send({

          name: "Database",

          email: "database@gmail.com",

          password: "Password1",

        });

      const user =
        await User.findOne({

          email: "database@gmail.com",

        });

      expect(user).not.toBeNull();

      expect(user.name)
        .toBe("Database");

    }
  );

});

/**
 * =======================================================
 * End Authentication Tests
 * =======================================================
 */