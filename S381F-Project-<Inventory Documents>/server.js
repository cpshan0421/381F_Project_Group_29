const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const docRoutes = require('./routes/docRoutes');
const bodyParser = require('body-parser');

// express app
const app = express();

// connect to mongodb & listen for requests
const dbURI = "mongodb+srv://admin:admin@cluster0.arpzdfb.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => app.listen(3000))
  .catch(err => console.log(err));

// register view engine
app.set('view engine', 'ejs');

//user array
const users = [
{name: "admin", password: "admin"},
{name: "demo", password: "demo"},
{name: "student", password: "student"},
{name: "teacher", password: "teacher"}];

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

// routes
app.get('/', (req, res) => {
  res.redirect('/documents');
});

app.get('/logout', (req, res) => {
  req.session = null;
  req.authenticated = false;
  res.redirect('/documents/login');
});

// documents routes
app.use('/documents', docRoutes);

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});

