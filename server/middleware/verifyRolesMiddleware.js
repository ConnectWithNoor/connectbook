const verifyRolesMiddleware = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.roles)
      return next(new ErrorResponse('Not Allowed to perform this action', 401));

    const rolesList = [...allowedRoles];
    const isAllowedRole = req.roles.some((role) => rolesList.includes(role));

    if (!isAllowedRole)
      return next(new ErrorResponse('Not Allowed to perform this action', 401));

    next();
  };
};

export default verifyRolesMiddleware;
