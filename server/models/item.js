const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
       name: {
              type: String,
              required: true,
       },
       description: {
              type: String,
              required: true,
       },
       price: {
              type: Number,
              required: true,
       },
       image: {
              type: String,
              required: true,
       },
})

const itemModel = mongoose.model('Item', itemSchema);
module.exports = itemModel;

