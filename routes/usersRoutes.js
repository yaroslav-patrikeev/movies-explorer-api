const usersRouter = require('express').Router();
const { getUser, updateUser } = require('../controllers/userControllers');
const { updateUserValidation } = require('../validation/validation');

usersRouter.get('/me', getUser);
usersRouter.patch('/me', updateUserValidation, updateUser);
module.exports = usersRouter;
