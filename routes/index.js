const router = require('express').Router();
const { login, register, logout } = require('../controllers/authControllers');
const authorization = require('../middlewares/auth');
const moviesRouter = require('./moviesRoutes');
const usersRouter = require('./usersRoutes');

router.post('/signin', login);
router.post('/signup', register);
router.use(authorization);
router.use('/users', usersRouter);
router.use('/movies', moviesRouter);
router.post('/signout', logout);

module.exports = router;
