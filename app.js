const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const dotenv = require('dotenv').config();

const app = express();

// EJS
app.use(express.static('public'));
app.set('view engine', 'ejs');

// BodyParser
app.use(express.urlencoded({ extended: true }));

// Method Override
app.use(methodOverride('_method'));

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

// Show Post Route
app.get('/posts/:id', (req, res) => {
  Post.findById(req.params.id, (err, foundPost) => {
    if (err) {
      res.redirect('/');
    } else {
      res.render('show', { post: foundPost });
    }
  });
});

// Edit post route
app.get('/posts/:id/edit', (req, res) => {
  Post.findById(req.params.id, (err, foundPost) => {
    if (err) {
      res.redirect('/posts');
    } else {
      res.render('edit', { post: foundPost });
    }
  });
});

// Update Post route
app.put('/posts/:id', (req, res) => {
  Post.findByIdAndUpdate(req.params.id, req.body.post, (err, updatedPost) => {
    if (err) {
      res.redirect('/');
    } else {
      res.redirect(`/posts/${req.params.id}`);
    }
  });
});

// Delete Post route
app.delete('/posts/:id', (req, res) => {
  Post.findByIdAndRemove(req.params.id, err => {
    if (err) {
      res.redirect('/posts');
    } else {
      res.redirect('/posts');
    }
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));
