'use strict';

const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();

// Logging
app.use(morgan('common'));

// Load Models
const { Idea } = require('./models/Ideas');

// Handlebars Middleware
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// BodyParser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CORS
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
  if (req.method === 'OPTIONS') {
    return res.send(204);
  }
  next();
});

mongoose.Promise = global.Promise;

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to mongoose
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log('DB Connected'))
  .catch(err => console.log(err));

// Index route
app.get('/', (req, res) => {
  const title = 'StoryCrumb';
  res.render('index', {
    title
  });
});

// About route
app.get('/about', (req, res) => {
  res.render('about');
});

// Add Idea Form
app.get('/ideas/add', (req, res) => {
  res.render('ideas/add');
});

// Idea index page
app.get('/ideas', (req, res) => {
  Idea.find({})
    .sort({ date: 'desc' })
    .then(ideas => {
      res.render('ideas/index', {
        ideas
      });
    });
});

// Process form
app.post('/ideas', (req, res) => {
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

const port = process.env.port || 5000;
app.listen(port, () => {
  console.log(`Sparks are flying on port ${port}`);
});
