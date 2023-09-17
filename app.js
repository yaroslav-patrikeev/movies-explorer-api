const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const { errors } = require('celebrate');
const router = require('./routes');
const handleErrors = require('./middlewares/handleErrors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const limiter = require('./utils/limiter');
require('dotenv').config();

const { PORT, DB_URL } = process.env;

mongoose.connect(DB_URL).then(() => console.log('Database connected'));
const app = express();
app.use(helmet());
app.use(
  cors({
    credentials: true,
    origin: 'https://patrikeev.movies.nomoredomainsicu.ru',
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(requestLogger);

app.use(limiter);

app.use('/', router);

app.use(errorLogger);

app.use(errors());

app.use(handleErrors);

app.listen(PORT, () => {
  console.log(`Server is running on the port ${PORT}`);
});
