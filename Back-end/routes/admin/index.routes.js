
const productRoutes = require("./product.routes")
const systemConfig = require("../../config/system")
const uploadImage = require('./upload-image.routes')
module.exports = (app) => {
  const PATH_ADMIN = systemConfig.prefixAdmin;
  console.log(PATH_ADMIN)

  app.use( PATH_ADMIN + "/product", productRoutes);

  app.use(PATH_ADMIN + "/upload-image", uploadImage)

}