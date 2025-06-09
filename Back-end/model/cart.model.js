const mongoose = require("mongoose");
const slug = require('mongoose-slug-updater');

mongoose.plugin(slug);

const cartSchema = new mongoose.Schema({
   fullName: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  note: {
    type: String,
    default: "",
  },
  date_delivery: {
    type: Date,
    required: true,
  },
  time_received: {
    type: Date, 
    required: true,
  },
  products: [
    {
      info: {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
          required: true,
        },
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
    }
  ],
  totalPrice: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    default: "Chờ xác nhận",
    enum: ["Chờ xác nhận", "Đã xác nhận", "Đang giao hàng", "Đã giao", "Đã hủy"],
  }
});

const Cart = mongoose.model('Cart', cartSchema, 'carts');
module.exports = Cart;
