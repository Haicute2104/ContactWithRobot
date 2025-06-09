const Product = require("../../model/product.model");

module.exports.index = async (req, res) => {
  const keyword = req.query.query;
  try {
    let products;
    if (keyword) {

      const regex = new RegExp(keyword, 'i');

      products = await Product.find({
        $or: [ // Tìm kiếm trong các trường 'name' hoặc 'description' (hoặc bất kỳ trường nào bạn muốn)
          {
            name: regex
          },
          {
            category: regex
          },
          {
            'flavors.name': regex
          }
        ],
        deleted: false
      }).sort({
        position: 'desc'
      });

    } else {

      products = await Product.find({
        deleted: false
      }).sort({
        position: 'desc'
      });
    }

    res.json(products);

  } catch (error) {
    console.error("Lỗi khi tìm kiếm sản phẩm:", error);
    res.status(500).json({
      message: "Đã xảy ra lỗi khi lấy dữ liệu sản phẩm.",
      error: error.message
    });
  }
};