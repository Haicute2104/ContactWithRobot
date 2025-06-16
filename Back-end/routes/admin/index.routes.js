
const productRoutes = require("./product.routes")
const systemConfig = require("../../config/system")
const uploadImage = require('./upload-image.routes');
const searchRoutes = require('./search.routes');
const checkoutRoutes = require('./checkout.routes');
const cartRoutes = require('./cart.routes');

module.exports = (app) => {
  const PATH_ADMIN = systemConfig.prefixAdmin;
  console.log(PATH_ADMIN)

  app.use( PATH_ADMIN + "/product", productRoutes);

  app.use(PATH_ADMIN + "/upload-image", uploadImage);

  app.use(PATH_ADMIN + "/search", searchRoutes);

  app.use(PATH_ADMIN + "/checkout", checkoutRoutes);

  app.use(PATH_ADMIN + "/cart", cartRoutes);


}