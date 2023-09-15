const mongoose = require('mongoose');
const { emailRegExp } = require('../utils/constants');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Поле должно быть заполнено'],
    validate: {
      validator(v) {
        return emailRegExp.test(v);
      },
      unique: true,
    },
  },
  password: {
    type: String,
    required: [true, 'Поле должно быть заполнено'],
    select: false,
  },
  name: {
    type: String,
    required: [true, 'Поле должно быть заполнено'],
    minlength: [2, 'Минимальная длина поля — 2'],
    maxlength: [30, 'Минимальная длина поля — 30'],
  },
});

userSchema.methods.toJSON = () => {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

module.exports = mongoose.module('user', userSchema);
