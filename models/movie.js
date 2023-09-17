const mongoose = require('mongoose');
const { urlRegExp, idRegExp } = require('../utils/constants');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    require: [true, 'Поле "country" должно быть заполнено'],
  },
  director: {
    type: String,
    require: [true, 'Поле "director" должно быть заполнено'],
  },
  duration: {
    type: Number,
    require: [true, 'Поле "duration" должно быть заполнено'],
  },
  year: {
    type: String,
    require: [true, 'Поле "year" должно быть заполнено'],
  },
  description: {
    type: String,
    require: [true, 'Поле "description" должно быть заполнено'],
  },
  image: {
    type: String,
    require: [true, 'Поле "image" должно быть заполнено'],
    validate: {
      validator(v) {
        return urlRegExp.test(v);
      },
    },
  },
  trailerLink: {
    type: String,
    require: [true, 'Поле "trailerLink" должно быть заполнено'],
    validate: {
      validator(v) {
        return urlRegExp.test(v);
      },
    },
  },
  thumbnail: {
    type: String,
    require: [true, 'Поле "thumbnail" должно быть заполнено'],
    validate: {
      validator(v) {
        return urlRegExp.test(v);
      },
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    require: [true, 'Поле "owner" должно быть заполнено'],
    ref: 'user',
    validator(v) {
      return idRegExp.test(v);
    },
  },
  movieId: {
    type: Number,
    require: [true, 'Поле "movieId" должно быть заполнено'],
  },
  nameRU: {
    type: String,
    require: [true, 'Поле "nameRU" должно быть заполнено'],
  },
  nameEN: {
    type: String,
    require: [true, 'Поле "nameEN" должно быть заполнено'],
  },
});

module.exports = mongoose.model('movie', movieSchema);
