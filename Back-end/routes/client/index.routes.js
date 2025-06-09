const productRoutes = require("./product.routes")

const searchRoutes = require('./search.routes');

module.exports = (app) => {
  app.use("/product", productRoutes);

  app.use("/search", searchRoutes);
  
}