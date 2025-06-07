const express = require('express')

const route = require('./routes/client/index.routes')
const routeAdmin = require('./routes/admin/index.routes')
const methodOverride = require('method-override')
const systemConfig = require('./config/system');
const cors = require('cors');
const multer  = require('multer');
const storageMulter = require('./helper/stogareMulter')
const upload = multer({storage: storageMulter()});

require('dotenv').config();

const database = require("./config/database");

database.connect();


const app = express()
const port = process.env.PORT || 3000;

const corsOptions = {
  origin: 'http://localhost:5173', // Chỉ cho phép nguồn gốc của ứng dụng React của bạn
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Nếu bạn cần xử lý cookie hoặc header ủy quyền
  optionsSuccessStatus: 204 // Một số trình duyệt cũ (IE11, SmartTVs) có thể gặp vấn đề với 204
};
app.use(cors(corsOptions));

app.set("views", "./views");
app.set("view engine", "pug");
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//App Local
app.locals.prefixAdmin = systemConfig.prefixAdmin;

//Router
route(app)
routeAdmin(app)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})