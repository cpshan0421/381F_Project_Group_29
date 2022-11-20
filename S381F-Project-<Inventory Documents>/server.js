const express = require('express');
const morgan = require('morgan');
const session = require('cookie-session');
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

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

//Cookie
app.use(session({
  userid: "session",  
  keys: ['th1s!sA5ecretK3y'],
  //maxAge: 90 * 24 * 60 * 60 * 1000
}));



// documents routes
app.use('/documents', docRoutes);


//login
app.use((req, res, next) => {
  console.log("Checking login status");
  if (req.path == '/documents/login' && req.method == 'POST') {
    console.log('whitelist login post req');
    next();
    return;
  }
  if (req.session.authenticated){
    next();
  } 
  else {
      res.redirect("/documents/login");
  }
});

// routes
app.get('/', (req, res) => {
  res.redirect('/documents');
});

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});

