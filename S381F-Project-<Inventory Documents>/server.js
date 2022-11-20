const express = require('express');
const morgan = require('morgan');
const session = require('cookie-session');
const mongoose = require('mongoose');
const docRoutes = require('./routes/docRoutes');
const bodyParser = require('body-parser');


// express app
const app = express();

//HTML 
const html = require('html');
const url = require('url');
const assert = require('assert');

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


// Create a new inventory documents
var inventoryId = new ObjectID;

 DOC["_id"] = inventoryId;

        DOC['inv_id']= "";
        DOC['inv_name']= req.fields.name;
        DOC['inv_type']= req.fields.inv_type;
        DOC['quantity']= req.fields.quantity;
        DOC['photo']= req.fields.photo;
        DOC['photo mimetype']= req.fields.photo;
        console.log("...putting data into DOC");

        var adoc ={};
        DOC['address'] = adoc;
        adoc['street'] = req.fields.street;
        adoc['building'] = req.fields.building;
        adoc['country'] = req.fields.country;
        adoc['coord'] = req.fields.coord;

        var pdoc = {};
        if (req.files.photo && req.files.photo.size > 0 && (pdoc['mimetype'] == 'image/jpeg' || pdoc['mimetype'] == 'image/png')) {
            fs.readFile(req.files.photo.path, (err, data) => {
                assert.equal(err,null);
                pdoc['title'] = req.fields.title;
                pdoc['data'] = new Buffer.from(data).toString('base64');
                pdoc['mimetype'] = req.files.photo.type;

            });
        }

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

//find doc with criteria
const findDocument = (db, criteria, callback) => {
    let cursor = db.collection('inventory').find(criteria);
    console.log(`findDocument: ${JSON.stringify(criteria)}`);
    cursor.toArray((err, docs)=>{
        assert.equal(err, null);
        console.log(`findDocument: ${docs.length}`);
        callback(docs);
    });
}

// routes
app.get('/', (req, res) => {
  res.redirect('/documents');
});
//Delete inventory documents
const delete inventory Document = (db, criteria, callback) => {
    db.inventory.remove(
       criteria,
       (err, results) => {
          assert.equal(err, null);
          console.log(results);
          callback();
       }
    );
};
app.get('/delete', (req, res)=>{
    if(req.session.userid == req.query.owner){
        console.log("Hello owner!");
        handle_Delete(res, req.query);
    }else{
        res.status(200).render('info', {message: "You are not owner - You don't have the access right!"});
    }
});

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});
app.listen(process.env.PORT || 8099);
