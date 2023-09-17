const { serverTextError } = require('../utils/constants');

const handleErrors = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = statusCode === 500 ? serverTextError : err.message;
  res.status(statusCode).send({ message });
  next();
};

module.exports = handleErrors;
