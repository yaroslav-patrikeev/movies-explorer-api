const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ConflictError = require('../errors/ConflictError');
const IncorrectDataError = require('../errors/IncorrectDataError');
const UnauthorizedError = require('../errors/UnauthorizedError');
const user = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;

const register = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      req.body.password = hash;
      return user.create(req.body);
    })
    .then((data) => res.status(201).send(data))
    .catch((err) => {
      if (err.code === 11000) {
        return next(new ConflictError('Такой еmail уже зарегистрирован'));
      }
      if (err.name === 'ValidationError') {
        return next(new IncorrectDataError('Некорректные данные'));
      }
      return next(err);
    });
};
const login = (req, res, next) => {
  const { email, password } = req.body;
  user
    .findOne({ email })
    .select('+password')
    .then((data) => {
      if (!data) {
        return next(new UnauthorizedError('Неправильные почта или пароль'));
      }
      bcrypt.compare(password, data.password).then((result) => {
        if (!result) {
          return next(new UnauthorizedError('Неправильные почта или пароль'));
        }
        const token = jwt.sign(
          { _id: data._id },
          NODE_ENV === 'production' ? JWT_SECRET : 'secret-key'
        );
        return res
          .status(200)
          .cookie('token', token, {
            maxAge: 3600000 * 24 * 7,
            httpOnly: true,
          })
          .send({ token });
      });
    })
    .catch(next);
};

const logout = (req, res, next) => {
  const message = 'Выход';
  res.clearCookie('token').send({ message });
  next();
};

module.exports = { register, login, logout };
