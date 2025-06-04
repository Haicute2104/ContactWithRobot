const productRoutes = require("./product.routes")

module.exports = (app) => {
  app.use("/product", productRoutes);


}