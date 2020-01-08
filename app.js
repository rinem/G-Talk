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

// Load Post model
const Post = require('./models/Post');

app.get('/posts', (req, res) => {
  res.render('index');
});

app.get('/', (req, res) => {
  res.redirect('/posts');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));
