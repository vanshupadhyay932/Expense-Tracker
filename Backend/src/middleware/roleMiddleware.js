/**
 * Role Authorization Middleware
 */
const roleMiddleware = (
  ...allowedRoles
) => {

  return (
    req,
    res,
    next
  ) => {

    if (
      !req.user ||
      !allowedRoles.includes(req.user.role)
    ) {

      res.status(403);

      return next(
        new Error(
          "Access denied"
        )
      );
    }

    next();
  };
};

module.exports = roleMiddleware;