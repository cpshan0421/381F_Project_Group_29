const Document = require('../models/document');
//user array
const users = [
  {name: "admin", password: "admin"},
  {name: "demo", password: "demo"},
  {name: "student", password: "student"},
  {name: "teacher", password: "teacher"}];

const doc_index = (req, res) => {
  Document.find().sort({ createdAt: -1 })
    .then(result => {
      res.render('index', { documents: result, title: 'All Documents' });
    })
    .catch(err => {
      console.log(err);
    });
}

const doc_search = (req, res) => {
  const field = req.query.Document;
  const target = req.query.target;
  const searchObj = {};
  searchObj[field] = target;
  Document.find(searchObj).sort({ createdAt: -1 })
    .then(result => {
      res.render('index', { documents: result, title: 'All Documents' });
    })
    .catch(err => {
      console.log(err);
    });
}

const doc_details = (req, res) => {
  const id = req.params.id;
  Document.findById(id)
    .then(result => {
      res.render('details', { document: result, title: 'Documents Details' });
    })
    .catch(err => {
      res.render('404', { title: 'Document not found' });
    });
}

const doc_create_get = (req, res) => {
  res.render('create', { title: 'Create a new document' });
}

const doc_login_get = (req, res) => {
  res.render('login', { title: 'Login to your account' });
}

const doc_login_post = (req, res) => {
  const Uname = req.body.username;
  const PW = req.body.password;
  users.forEach((user) => {
      if (user.name == Uname && user.password == PW) {
        req.session.authenticated = true;
        req.session.userid = Uname;
        console.log(req.session.userid);
        res.redirect('/documents/index');
      }
  })
  res.redirect('/login');
}

const doc_logout = (req, res) => {
  try {
    console.log('Logout');
    req.session = null;
    req.authenticated = false;
    res.redirect('/login');
    console.log(req.session);
    console.log(req.authenticated);
  }
  catch (e){
    console.log(e.message);
  };
}

const doc_create_post = (req, res) => {
  const doc = new Document(req.body);
  doc.save()
    .then(result => {
      res.redirect('/documents/index');
    })
    .catch(err => {
      console.log(err);
    });
}

const doc_delete = (req, res) => {
  const id = req.params.id;
  Document.findByIdAndDelete(id)
    .then(result => {
      res.json({ redirect: '/documents/index' });
    })
    .catch(err => {
      console.log(err);
    });
}

const doc_update = (req, res) => {
  const id = req.params.id;
  const doc = new Document(req.body);
  console.log(doc);
  Document.findByIdAndUpdate(id, {
    inventory_ID: doc.inventory_ID,
    name: doc.name,
    manager: doc.manager,
    type: doc.type,
    quantity: doc.quantity,
  })
    .then(result => {
      // res.json({ redirect: `/documents/${id}` });
      res.redirect(`/documents/${id}`)
    })
    .catch(err => {
      console.log(err);
    });
}

module.exports = {
  doc_index,
  doc_search, 
  doc_details, 
  doc_create_get, 
  doc_create_post, 
  doc_delete,
  doc_login_get,
  doc_update,
  doc_login_post,
  doc_logout,
}