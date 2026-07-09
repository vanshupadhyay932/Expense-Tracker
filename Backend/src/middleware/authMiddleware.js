const jwt = require("jsonwebtoken");

const User = require("../models/User");

/**
 * Authentication Middleware
 */
const authMiddleware = async (
  req,
  res,
  next
) => {
  try {

    let token;

    // Check Authorization Header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {

      token =
        req.headers.authorization.split(" ")[1];

      // Verify Token
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
      );

      // Find User
      req.user = await User.findById(
        decoded.id
      ).select("-password");

      return next();
    }

    res.status(401);

    throw new Error("Not authorized");

  } catch (error) {

    res.status(401);

    next(error);
  }
};

module.exports = authMiddleware;