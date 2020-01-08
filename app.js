const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const app = express();

// EJS
app.use(express.static('public'));
app.set('view engine', 'ejs');

// BodyParser
app.use(express.urlencoded({ extended: true }));

// DB config
const db = process.env.DB_URL;

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('DB connected..!'))
  .catch(err => console.log(err));

app.get('/posts', (req, res) => {
  res.render('index');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));
