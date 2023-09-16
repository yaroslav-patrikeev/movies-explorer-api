const ForbiddenError = require('../errors/ForbiddenError');
const IncorrectDataError = require('../errors/IncorrectDataError');
const ServerError = require('../errors/ServerError');
const movie = require('../models/movie');

const getMovies = (req, res, next) => {
  movie
    .find({})
    .then((data) => res.status(200).send(data))
    .catch((err) => {
      next(new ServerError(err.message));
    });
};

const createMovie = (req, res, next) => {
  movie
    .create(req.body)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      next(new IncorrectDataError(error.message));
    });
};

const deleteMovie = (req, res, next) => {
  const { _id } = req.params;
  movie
    .deleteOne({ _id })
    .then(() => {
      res.status(200).send({ message: 'Фильм успешно удален' });
    })
    .catch((error) => {
      next(new ForbiddenError(error.message));
    });
};

module.exports = { getMovies, createMovie, deleteMovie };
