const router = require('express').Router();
const { login, register, logout } = require('../controllers/authControllers');
const NotFoundError = require('../errors/NotFoundError');
const authorization = require('../middlewares/auth');
const { notFoundPageTextError } = require('../utils/constants');
const {
  loginValidation,
  registerValidation,
} = require('../validation/validation');
const moviesRouter = require('./moviesRoutes');
const usersRouter = require('./usersRoutes');

router.post('/signin', loginValidation, login);
router.post('/signup', registerValidation, register);
router.use(authorization);
router.use('/users', usersRouter);
router.use('/movies', moviesRouter);
router.post('/signout', logout);

module.exports = router;
