const jwt = require("jsonwebtoken");

/**
 * ===========================================================
 * Generate JWT Token
 * ===========================================================
 *
 * @param {String} id
 * @returns {String}
 */
const generateToken = (id) => {

  return jwt.sign(

    {
      id: id,
    },

    process.env.JWT_SECRET,

    {
      expiresIn: "7d",
    }

  );

};

module.exports = generateToken;