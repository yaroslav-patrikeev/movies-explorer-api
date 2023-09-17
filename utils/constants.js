const emailRegExp = /[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+/;
const urlRegExp = /https?:\/\/w{0,3}\.?\S+\.\S+/;
const idRegExp = /[a-z0-9]{24}/;

const successfulMovieDeleteText = 'Фильм успешно удален';
const updateDataSuccess = 'Данные успешно обновлены';
const exitMessage = 'Выход';

const doubleEmailTextError = 'Пользователь с таким email уже существует';
const incorrectDataTextError = 'Некорректные данные';
const incorrectEmailOrPasswordTextError = 'Неправильные почта или пароль';
const forbiddenForDeleteMovieTextError =
  'Недостаточно прав для удаления фильма';
const notFoundMovieForDeleteTextError = 'Фильм для удаления не найден';
const notFoundSavedMoviesTextError = 'Сохраненных фильмов нет';
const doubleDataUpdateTextError =
  'Данные не обновлены, так как не отличаются от текущих';
const authorizationTextError = 'Необходимо авторизоваться';
const serverTextError = 'Ошибка на сервере';

module.exports = {
  emailRegExp,
  urlRegExp,
  idRegExp,
  doubleEmailTextError,
  incorrectDataTextError,
  incorrectEmailOrPasswordTextError,
  successfulMovieDeleteText,
  forbiddenForDeleteMovieTextError,
  notFoundMovieForDeleteTextError,
  notFoundSavedMoviesTextError,
  updateDataSuccess,
  doubleDataUpdateTextError,
  exitMessage,
  authorizationTextError,
  serverTextError,
};
