/**
 * User Roles
 * These roles define what permissions a user has.
 */

const ROLES = {

  /**
   * Regular User
   * Can manage only their own transactions.
   */
  USER: "user",

  /**
   * Administrator
   * Has full access to the application.
   */
  ADMIN: "admin",

};

module.exports = ROLES;