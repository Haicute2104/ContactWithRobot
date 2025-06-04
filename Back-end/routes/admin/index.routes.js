const productRoutes = require("./product.routes")
const systemConfig = require("../../config/system")

module.exports = (app) => {
  const PATH_ADMIN = systemConfig.prefixAdmin;

  app.use( PATH_ADMIN + "/product", productRoutes);

}