const Product = require("../../model/product.model");
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
module.exports.create = async (req, res) => {
  // console.log(req.body);
  // console(req.file.fileName)

  const product = new Product({
    ...req.body,
    timestamp: new Date(),
  })
  product.save();
  return res.status(200).json({ success: true, message: "Thêm sản phẩm thành công" });
  
}

module.exports.delete = async (req, res) => {
  const id = req.params.id;
  await Product.deleteOne({
    _id: id
  });
  return res.status(200).json({ success: true, message: "Xóa sản phẩm thành công" });
}

module.exports.edit = async (req, res) => {
  const id = req.params.id;
  const productDetail = await Product.findById({
    _id: id
  });
  res.json(productDetail);
}

module.exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    // console.log(id);
    // console.log(req.body);
    await Product.updateOne(
      {
        _id: id
      },
      req.body
    );
    return res.status(200).json({ success: true, message: "Cập nhật sản phẩm thành công" });

  } catch (error) {
    return res.status(200).json({ error: true, message: "Cập nhật sản phẩm thất bại" });

  }
  
}

module.exports.changeMulti = async (req, res) => {
  console.log(req.body);
  const { ids, action } = req.body;

  // Kiểm tra nếu không có bản ghi nào được chọn
  if (!ids || ids.length === 0) {
    return res.status(200).json({
      success: false,
      message: "Vui lòng chọn các bản ghi"
    });
  }

  try {
    let updateResult;
    let message;

    switch (action) {
      case "active":
        updateResult = await Product.updateMany(
          { _id: { $in: ids } },
          { status: "active" }
        );
        message = "Đã chuyển trạng thái hoạt động thành công.";
        break;

      case "inactive":
        updateResult = await Product.updateMany(
          { _id: { $in: ids } },
          { status: "inactive" }
        );
        message = "Đã chuyển trạng thái ngừng hoạt động thành công.";
        break;

      case "delete-all":
        updateResult = await Product.updateMany(
          { _id: { $in: ids } },
          { deleted: true, deletedAt: new Date() }
        );
        message = "Đã xóa thành công.";
        break;

      default:
        return res.status(400).json({
          success: false,
          message: "Hành động không hợp lệ."
        });
    }

    return res.status(200).json({
      success: true,
      message
    });

  } catch (error) {
    console.error("Lỗi trong hàm changeMulti:", error);
    return res.status(500).json({
      success: false,
      message: "Đã xảy ra lỗi máy chủ nội bộ khi cập nhật sản phẩm."
    });
  }
};
