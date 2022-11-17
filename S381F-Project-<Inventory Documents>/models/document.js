const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const docSchema = new Schema({
  inventory_ID: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  manager: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  quantity: {
    type: String,
    required: true
  },
}, { timestamps: true });

const Document = mongoose.model('Document', docSchema);
module.exports = Document;