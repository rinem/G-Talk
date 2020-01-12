const express = require('express');

const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

// Load Posts model
const Post = require('../models/Post');

// Get Posts
router.get('/posts', ensureAuthenticated, (req, res) => {
  Post.find({}, (err, posts) => {
    if (err) {
      console.log(err);
    } else {
      res.render('posts', { posts });
    }
  });
});

// New Post route
router.get('/posts/new', ensureAuthenticated, (req, res) => {
  res.render('new');
});

// Create Posts route
router.post('/posts', ensureAuthenticated, (req, res) => {
  console.log(req.body);
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
router.get('/posts/:id', ensureAuthenticated, (req, res) => {
  Post.findById(req.params.id, (err, foundPost) => {
    if (err) {
      res.redirect('/posts');
    } else {
      res.render('show', { post: foundPost });
    }
  });
});

// Edit post route
router.get('/posts/:id/edit', ensureAuthenticated, (req, res) => {
  Post.findById(req.params.id, (err, foundPost) => {
    if (err) {
      res.redirect('/posts');
    } else {
      res.render('edit', { post: foundPost });
    }
  });
});

// Update Post route
router.put('/posts/:id', ensureAuthenticated, (req, res) => {
  Post.findByIdAndUpdate(req.params.id, req.body.post, (err, updatedPost) => {
    if (err) {
      res.redirect('/posts');
    } else {
      res.redirect(`/posts/${req.params.id}`);
    }
  });
});

// Delete Post route
router.delete('/posts/:id', ensureAuthenticated, (req, res) => {
  Post.findByIdAndRemove(req.params.id, err => {
    if (err) {
      res.redirect('/posts');
    } else {
      res.redirect('/posts');
    }
  });
});

module.exports = router;
