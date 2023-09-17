const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { errors } = require('celebrate');
const router = require('./routes');
const handleErrors = require('./middlewares/handleErrors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
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

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: 'draft-7', // draft-6: RateLimit-* headers; draft-7: combined RateLimit header
    legacyHeaders: false, // X-RateLimit-* headers
    // store: ... , // Use an external store for more precise rate limiting
  })
);

app.use('/', router);

app.use(errorLogger);

app.use(errors());

app.use(handleErrors);

app.listen(PORT, () => {
  console.log(`Server is running on the port ${PORT}`);
});
