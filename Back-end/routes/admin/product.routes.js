const express = require('express');
const multer  = require('multer')
const upload = multer({ dest: './public/uploads/' })
const controller = require('../../controller/admin/product.controller');

const router = express.Router();

// Route hiện tại
router.get("/", controller.index);
router.get("/:id", controller.show);
router.patch('/change-status/:status/:id', controller.changeStatus);

// Route mới: tạo sản phẩm kèm upload ảnh
router.post('/create', upload.array('image'), controller.create );

router.delete('/delete/:id', controller.delete);

router.get('/edit/:id', controller.edit)

module.exports = router;
