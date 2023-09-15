const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const router = require('./routes');
const handleErrors = require('./middlewares/handleErrors');
require('dotenv').config();

const { PORT, DB_URL } = process.env;

mongoose.connect(DB_URL).then(() => console.log('Database connected'));
const app = express();

app.use(cookieParser());

app.use('/', router);

app.use(handleErrors);

app.listen(PORT, () => {
  console.log(`Server is running on the port ${PORT}`);
});
