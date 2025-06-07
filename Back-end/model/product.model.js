const mongoose = require("mongoose");
const slug = require('mongoose-slug-updater');

mongoose.plugin(slug);

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, slug: "name", unique: true },
  category: { type: String, required: true },
  description: { type: String },
  flavors: [{ type: String }],
  size_cm: { type: Number },
  serving: { type: String },
  price: { type: Number },
  image: [{ type: String }],
  accessories: {
    nen: { type: Number },
    dao: { type: Number },
    dia: { type: Number }
  },
  sensation: String,
  status: String,
  deleted: {
    type: Boolean,
    default: false
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

const Product = mongoose.model('Product', productSchema, 'products');
module.exports = Product;
