const Product = require("../../model/product.model")
module.exports.index = async (req, res) => {
  try {
    const products = await Product.find({
      deleted: false
    });

    res.json(products);
    console.log("Sản phẩm đã được gửi về frontend.");
  } catch (error) {
    console.error("Lỗi khi lấy sản phẩm:", error);
    res.status(500).json({
      message: "Lỗi server khi lấy dữ liệu sản phẩm."
    });
  }
}

module.exports.changeStatus = async (req, res) => {
  const status = req.params.status;
  const id = req.params.id;
  await Product.updateOne(
    {
      _id: id
    },
    {
      status: status
    }
  );
  return res.status(200).json({ success: true, message: "Thay đổi trạng thái thành công" });
}

module.exports.show = async (req, res) => {
  const id = req.params.id;
  const productDetail = await Product.findById({
    _id: id
  });
  res.json(productDetail);
  
}