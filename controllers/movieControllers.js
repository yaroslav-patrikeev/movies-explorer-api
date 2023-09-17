const ForbiddenError = require('../errors/ForbiddenError');
const IncorrectDataError = require('../errors/IncorrectDataError');
const NotFoundError = require('../errors/NotFoundError');
const movie = require('../models/movie');

const getMovies = (req, res, next) => {
  const { _id } = req.user;
  movie
    .find({ owner: _id })
    .then((data) => {
      if (!data[0]) next(new NotFoundError('Сохраненных фильмов нет'));
      res.status(200).send(data);
    })
    .catch(next);
};

const createMovie = (req, res, next) => {
  const { _id } = req.user;
  movie
    .create({ ...req.body, owner: _id })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  const { _id } = req.params;
  movie
    .findOne({ _id })
    .then((movieData) => {
      if (movieData.owner.toString() !== req.user._id) {
        return next(
          new ForbiddenError('Недостаточно прав для удаления фильма')
        );
      }
      return movie
        .deleteOne({ _id })
        .then(() => {
          res.status(200).send({ message: 'Фильм успешно удален' });
        })
        .catch(next);
    })

    .catch((err) => {
      if (err.name === 'TypeError') {
        next(new IncorrectDataError('Фильм для удаления не найден'));
      }

      next(err);
    });
};

module.exports = { getMovies, createMovie, deleteMovie };
