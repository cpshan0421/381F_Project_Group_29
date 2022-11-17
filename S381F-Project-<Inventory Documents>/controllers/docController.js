const Document = require('../models/document');

const doc_index = (req, res) => {
  const document = req.params;
  console.log(document);
  Document.find().sort({ createdAt: -1 })
    .then(result => {
      res.render('index', { documents: result, title: 'Targeted Documents' });
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
const doc_login = (req, res) => {
  res.render('login', { title: 'Login to your account' });
}

const doc_create_post = (req, res) => {
  const doc = new Document(req.body);
  doc.save()
    .then(result => {
      res.redirect('/documents');
    })
    .catch(err => {
      console.log(err);
    });
}

const doc_delete = (req, res) => {
  const id = req.params.id;
  Document.findByIdAndDelete(id)
    .then(result => {
      res.json({ redirect: '/documents' });
    })
    .catch(err => {
      console.log(err);
    });
}

module.exports = {
  doc_index, 
  doc_details, 
  doc_create_get, 
  doc_create_post, 
  doc_delete,
  doc_login
}