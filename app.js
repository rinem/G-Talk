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

// Routes

// Get Posts route
app.get('/', (req, res) => {
  res.redirect('/posts');
});

app.get('/posts', (req, res) => {
  Post.find({}, (err, posts) => {
    if (err) {
      console.log(err);
    } else {
      res.render('index', { posts });
    }
  });
});

// New Post route
app.get('/posts/new', (req, res) => {
  res.render('new');
});

// Create Posts route
app.post('/posts', (req, res) => {
  Post.create(req.body.post, (err, newPost) => {
    if (err) {
      res.render('new');
      console.log(newPost);
    } else {
      res.redirect('/posts');
      console.log(newPost);
    }
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));
