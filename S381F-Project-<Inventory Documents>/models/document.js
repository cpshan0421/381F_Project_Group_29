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
count DocumentsOperation extends AggregateOperation {
  constructor(collection, query, options) {
    const pipeline = [{ $match: query }];
    if (typeof options.skip === 'number') {
      pipeline.push({ $skip: options.skip });
    }

      pipeline.push({ $group: { inventory_id: 1, n: { $sum: 1 } } });
    super(collection, pipeline, options);
  }

  execute(server, callback) {
    super.execute(server, (err, result) => {
      if (err) {
        callback(err, null);
        return;
      }
