const express = require('express')

const route = require('./routes/client/index.routes')
const routeAdmin = require('./routes/admin/index.routes')
const methodOverride = require('method-override')
const systemConfig = require('./config/system');




require('dotenv').config();

const database = require("./config/database");

database.connect();


const app = express()
const port = process.env.PORT || 3000;

app.set("views", "./views");
app.set("view engine", "pug");
app.use(express.static('public'));
app.use(methodOverride('_method'));

//App Local
app.locals.prefixAdmin = systemConfig.prefixAdmin;

//Router
route(app)
routeAdmin(app)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})