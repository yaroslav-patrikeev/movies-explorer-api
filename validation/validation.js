const { celebrate, Joi } = require('celebrate');
const { urlRegExp, idRegExp } = require('../utils/constants');

const loginValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const registerValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required().min(2).max(30),
    password: Joi.string().required(),
  }),
});

const updateUserValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email(),
    name: Joi.string().min(2).max(30),
  }),
});

const createMovieValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().regex(urlRegExp),
    trailerLink: Joi.string().required().regex(urlRegExp),
    thumbnail: Joi.string().required().regex(urlRegExp),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const deleteMovieValidation = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().required().regex(idRegExp),
  }),
});

module.exports = {
  loginValidation,
  registerValidation,
  updateUserValidation,
  createMovieValidation,
  deleteMovieValidation,
};
