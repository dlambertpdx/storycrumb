const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

// Load Models
require('../models/Ideas');
const Idea = mongoose.model('ideas');

// Idea index page
router.get('/', (req, res) => {
  Idea.find({})
    .sort({ date: 'desc' })
    .then(ideas => {
      res.render('ideas/index', {
        ideas
      });
    });
});

// Add Idea Form
router.get('/add', (req, res) => {
  res.render('ideas/add');
});

// Edit Idea Form
router.get('/edit/:id', (req, res) => {
  Idea.findOne({
    _id: req.params.id
  }).then(idea => {
    res.render('ideas/edit', {
      idea
    });
  });
});

// Process form
router.post('/', (req, res) => {
  let errors = [];
  if (!req.body.title) {
    errors.push({ text: 'Please add a title' });
  }
  if (!req.body.idea) {
    errors.push({ text: 'Please enter an idea' });
  }
  if (errors.length > 0) {
    res.render('ideas/add', {
      errors,
      title: req.body.title,
      idea: req.body.idea
    });
  } else {
    const newUser = {
      title: req.body.title,
      idea: req.body.idea
    };
    new Idea(newUser).save().then(idea => {
      res.redirect('/ideas');
    });
  }
});

// Edit form process -- refactor to ajax request later
router.put('/:id', (req, res) => {
  Idea.findOne({
    _id: req.params.id
  }).then(idea => {
    // new values
    idea.title = req.body.title;
    idea.idea = req.body.idea;

    idea.save().then(idea => {
      res.redirect('/ideas');
    });
  });
});

// Delete Idea
router.delete('/:id', (req, res) => {
  Idea.deleteOne({ _id: req.params.id }).then(() => {
    res.redirect('/ideas');
  });
});

module.exports = router;
