'use strict';

const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const passport = require('passport');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');

const app = express();

const { DATABASE_URL, PORT } = require('./config');

// Load Routes
const ideas = require('./routes/ideas');
const users = require('./routes/users');

// Passport Config
require('./config/passport')(passport);

// Logging
app.use(morgan('common'));

// Set public folder
app.use(express.static('public'));

app.use(flash());

// Handlebars Middleware
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// BodyParser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// MethodOverride Middleware
app.use(methodOverride('_method'));

// Express Session Middleware
const sess = {
  secret: 'secret',
  resave: true,
  saveUninitialized: true
};

app.use(session(sess));

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect Flash Middleware
app.use(flash());

// Global Variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

// CORS
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
  if(req.method === 'OPTIONS') {
    return res.send(204);
  }
  next();
});

mongoose.Promise = global.Promise;

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

// use routes
app.use('/ideas', ideas);
app.use('/users', users);

// Server Setup
let server;

function runServer(dbUrl = DATABASE_URL) {
  return new Promise((resolve, reject) => {
    mongoose.connect(
      dbUrl,
      { useNewUrlParser: true },
      err => {
        if(err) {
          return reject(err);
        }
        server = app
          .listen(PORT, () => {
            console.log(`All sytems go on port ${PORT}`);
            resolve();
          })
          .on('error', err => {
            mongoose.disconnect();
            reject(err);
          });
      }
    );
  });
}

function closeServer() {
  return mongoose.disconnect().then(
    () =>
      new Promise((resolve, reject) => {
        console.log('Closing server');
        server.close(err => {
          if(err) {
            return reject(err);
          }
          resolve();
        });
      })
  );
}

if(require.main === module) {
  runServer().catch(err => console.log(err));
}

module.exports = { app, runServer, closeServer };
