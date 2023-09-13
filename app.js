const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const { PORT, DB_URL } = process.env;
const app = express();

app.listen(PORT, () => {
  console.log(`Server is running on the port ${PORT}`);
});

mongoose.connect(DB_URL).then(() => console.log('Database connected'));
