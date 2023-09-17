const moviesRouter = require('express').Router();
const {
  createMovie,
  getMovies,
  deleteMovie,
} = require('../controllers/movieControllers');
const {
  createMovieValidation,
  deleteMovieValidation,
} = require('../validation/validation');

moviesRouter.get('/', getMovies);
moviesRouter.post('/', createMovieValidation, createMovie);
moviesRouter.delete('/:_id', deleteMovieValidation, deleteMovie);

module.exports = moviesRouter;
