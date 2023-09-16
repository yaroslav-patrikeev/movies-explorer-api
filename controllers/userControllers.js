const ServerError = require('../errors/ServerError');
const user = require('../models/user');

const getUser = (req, res, next) => {
  const { _id } = req.user;
  user
    .findOne({ _id })
    .then((data) => {
      const { email, name } = data;
      res.status(200).send({ email, name });
    })
    .catch((err) => next(new ServerError(err.message)));
};

const updateUser = (req, res, next) => {
  user
    .updateOne(req.body)
    .then(() => {
      res.status(200).send({ message: 'Данные обновлены' });
    })
    .catch((err) => next(new ServerError(err.message)));
};

module.exports = { getUser, updateUser };
