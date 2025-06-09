const Cart = require("../../model/cart.model");

module.exports.index = async (req, res) => {
  // console.log(req.body.products);
  // console.log(req.body)
  const cart = new Cart({
    ...req.body,
    date_delivery: new Date(req.body.date_delivery),
    time_received: new Date(`2000-01-01T${req.body.time_received}`),
    timestamp: new Date(),

  });
  await cart.save();
  return res.status(200).json({ success: true, message: "Tiến tới thanh toán", orderId: cart._id });

}
