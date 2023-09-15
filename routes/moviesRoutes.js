const moviesRouter = require('express').Router();
const {
  createMovie,
  getMovies,
  deleteMovie,
} = require('../controllers/movieControllers');

moviesRouter.get('/', getMovies);
moviesRouter.post('/', createMovie);
moviesRouter.delete('/:_id', deleteMovie);

module.exports = moviesRouter;
