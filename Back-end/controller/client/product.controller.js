const Product = require('../../model/product.model.js')
//[GET]
module.exports.index = async (req, res) => {
  try {
    const products = await Product.find({
      status: "active",
      deleted: false
    }); 

    res.json(products);
    console.log("Sản phẩm đã được gửi về frontend.");
  } catch (error) {
    console.error("Lỗi khi lấy sản phẩm:", error);
    res.status(500).json({ message: "Lỗi server khi lấy dữ liệu sản phẩm." });
  }
}
//[GET]
module.exports.show = async(req, res) =>{
  try{
    const productId = req.params.id;
    const productDetails = await Product.findOne(
      {
        _id: productId
      },
  )
    console.log(productDetails);
    res.json(productDetails)
  }
  catch(error){
    console.error("Lỗi khi lấy sản phẩm:", error);
    res.status(500).json({ message: "Lỗi server khi lấy dữ liệu sản phẩm." });
  }
}