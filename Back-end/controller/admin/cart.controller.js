const Cart = require("../../model/cart.model");
const Product = require("../../model/product.model")
module.exports.cartById = async (req, res) => {
  const id = req.params.id;
  const cartDetails = await Cart.findById(id).populate("products.info");
  console.log(cartDetails);
  return res.json(cartDetails);
}
