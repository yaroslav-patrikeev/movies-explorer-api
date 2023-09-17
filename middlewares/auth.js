const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');
const { authorizationTextError } = require('../utils/constants');

const { JWT_SECRET, NODE_ENV } = process.env;

const authorization = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    throw new UnauthorizedError(authorizationTextError);
  }
  let payload;
  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'secret-key'
    );
  } catch (error) {
    throw new UnauthorizedError(authorizationTextError);
  }

  req.user = payload;
  next();
};

module.exports = authorization;
