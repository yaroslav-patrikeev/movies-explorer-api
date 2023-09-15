const router = require('express').Router();
const authorization = require('../middlewares/auth');
const moviesRouter = require('./moviesRoutes');
const usersRouter = require('./usersRoutes');

router.use(authorization);
router.use('/users', usersRouter);
router.use('/movies', moviesRouter);

module.exports = router;
