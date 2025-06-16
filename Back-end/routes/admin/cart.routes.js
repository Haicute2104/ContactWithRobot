const express = require('express');
const router = express.Router();

const controller = require('../../controller/admin/cart.controller')

router.get("/:id", controller.cartById)

module.exports = router;