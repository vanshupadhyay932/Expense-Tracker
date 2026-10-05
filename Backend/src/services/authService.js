const bcrypt = require("bcryptjs");

const User = require("../models/User");

const generateToken = require("../config/jwt");

/**
 * ----------------------------------------------------
 * Register User Service
 * ----------------------------------------------------
 * Creates a new user account.
 */
const registerUser = async (userData) => {

  // Destructure user data
  const {
    name,
    email,
    password,
  } = userData;

  /**
   * Check if email already exists
   */
  const existingUser = await User.findOne({
    email,
  });

  if (existingUser) {

    throw new Error(
      "User already exists"
    );

  }

  /**
   * Hash Password
   */
  const salt = await bcrypt.genSalt(10);

  const hashedPassword =
    await bcrypt.hash(
      password,
      salt
    );

  /**
   * Create User
   */
  const user =
    await User.create({

      name,

      email,

      password:
        hashedPassword,

    });

  /**
   * Generate JWT
   */
  const token =
    generateToken(
      user._id
    );

  /**
   * Return Response
   */
  return {

    user: {

      id: user._id,

      name: user.name,

      email: user.email,

      role: user.role,

    },

    token,

  };

};

/**
 * ----------------------------------------------------
 * Login User Service
 * ----------------------------------------------------
 * Verifies credentials
 * and returns JWT.
 */
const loginUser = async (loginData) => {

  const {
    email,
    password,
  } = loginData;

  /**
   * Find User
   */
  const user =
    await User.findOne({
      email,
    });

  if (!user) {

    throw new Error(
      "Invalid email or password"
    );

  }

  /**
   * Compare Password
   */
  const isPasswordCorrect =
    await bcrypt.compare(
      password,
      user.password
    );

  if (!isPasswordCorrect) {

    throw new Error(
      "Invalid email or password"
    );

  }

  /**
   * Generate JWT
   */
  const token =
    generateToken(
      user._id
    );

  /**
   * Return User Data
   */
  return {

    user: {

      id: user._id,

      name: user.name,

      email: user.email,

      role: user.role,

    },

    token,

  };

};

module.exports = {

  registerUser,

  loginUser,

};