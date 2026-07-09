const bcrypt = require("bcryptjs");

/**
 * Hash Password
 * @param {String} password
 * @returns {String} hashedPassword
 */
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);

  const hashedPassword = await bcrypt.hash(
    password,
    salt
  );

  return hashedPassword;
};

/**
 * Compare Password
 * @param {String} password
 * @param {String} hashedPassword
 * @returns {Boolean}
 */
const comparePassword = async (
  password,
  hashedPassword
) => {
  return await bcrypt.compare(
    password,
    hashedPassword
  );
};

module.exports = {
  hashPassword,
  comparePassword,
};