const NotFoundError = require('../errors/NotFoundError');
const movie = require('../models/movie');
const {
  successfulMovieDeleteText,
  notFoundMovieForDeleteTextError,
} = require('../utils/constants');

const getMovies = (req, res, next) => {
  const { _id } = req.user;
  movie
    .find({ owner: _id })
    .then((data) => {
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
    .deleteOne({ movieId: _id, owner: req.user._id.toString() })
    .then(() => {
      res.status(200).send({ message: successfulMovieDeleteText });
    })
    .catch((err) => {
      if (err.name === 'TypeError') {
        return next(new NotFoundError(notFoundMovieForDeleteTextError));
      }

      next(err);
    });
};

module.exports = { getMovies, createMovie, deleteMovie };
