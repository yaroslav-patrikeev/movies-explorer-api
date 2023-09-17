const IncorrectDataError = require('../errors/IncorrectDataError');
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
  const { _id } = req.user;
  user
    .findOne({ _id })
    .then((data) => {
      const { name, email } = data;
      const dataForUpdate = { name, ...req.body };
      if (JSON.stringify({ name, email }) === JSON.stringify(dataForUpdate)) {
        next(
          new IncorrectDataError(
            'Данны не обновлены, так как не отличаются от текущих'
          )
        );
      }
      return user.updateOne({ _id }, dataForUpdate);
    })
    .then(() => {
      res.status(200).send({ message: 'Данные обновлены' });
    })
    .catch((err) => {
      console.log(err);
      if (err.code === 11000) {
        next(
          new IncorrectDataError('Пользователь с таким email уже существует')
        );
      }
      next(new ServerError(err.message));
    });
};

module.exports = { getUser, updateUser };
