const ConflictError = require('../errors/ConflictError');
const IncorrectDataError = require('../errors/IncorrectDataError');
const user = require('../models/user');

const getUser = (req, res, next) => {
  const { _id } = req.user;
  user
    .findOne({ _id })
    .then((data) => {
      const { email, name } = data;
      res.status(200).send({ email, name });
    })
    .catch(next);
};

const updateUser = (req, res, next) => {
  const { _id } = req.user;
  user
    .findOne({ _id })
    .then((data) => {
      const { name, email } = data;
      const dataForUpdate = { name, ...req.body };
      if (JSON.stringify({ name, email }) === JSON.stringify(dataForUpdate)) {
        return next(
          new ConflictError(
            'Данные не обновлены, так как не отличаются от текущих'
          )
        );
      }
      user
        .updateOne({ _id }, dataForUpdate)
        .then(() => {
          res.status(200).send({ message: 'Данные обновлены' });
        })
        .catch((err) => {
          if (err.code === 11000) {
            return next(
              new IncorrectDataError(
                'Пользователь с таким email уже существует'
              )
            );
          }
          next(err);
        });
    })
    .catch(next);
};

module.exports = { getUser, updateUser };
