const express = require('express');
const docController = require('../controllers/docController');

const router = express.Router();

router.get('/create', docController.doc_create_get);
router.get('/', docController.doc_index);
router.get('/search', docController.doc_search);
router.get('/login', docController.doc_login);
router.post('/', docController.doc_create_post);
router.get('/:id', docController.doc_details);
router.delete('/:id', docController.doc_delete);
router.post('/update/:id', docController.doc_update);

module.exports = router;