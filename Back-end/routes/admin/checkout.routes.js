const express = require('express');
const router = express.Router();

const controller = require('../../controller/admin/checkout.controller')

router.post("/", controller.index)

module.exports = router;