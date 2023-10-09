const ConflictError = require('../errors/ConflictError');
const IncorrectDataError = require('../errors/IncorrectDataError');
const user = require('../models/user');
const {
  updateDataSuccess,
  doubleEmailTextError,
  doubleDataUpdateTextError,
} = require('../utils/constants');

const getUser = (req, res, next) => {
  const { _id } = req.user;
  user
    .findOne({ _id })
    .then((data) => {
      const { email, userName } = data;
      res.status(200).send({ email, userName });
    })
    .catch(next);
};

const updateUser = (req, res, next) => {
  const { _id } = req.user;
  user
    .findOne({ _id })
    .then((data) => {
      const { userName, email } = data;
      const dataForUpdate = { userName, ...req.body };
      if (
        JSON.stringify({ userName, email }) === JSON.stringify(dataForUpdate)
      ) {
        return next(new ConflictError(doubleDataUpdateTextError));
      }
      user
        .updateOne({ _id }, dataForUpdate)
        .then(() => {
          res.status(200).send({ message: updateDataSuccess });
        })
        .catch((err) => {
          if (err.code === 11000) {
            return next(new IncorrectDataError(doubleEmailTextError));
          }
          next(err);
        });
    })
    .catch(next);
};

module.exports = { getUser, updateUser };
