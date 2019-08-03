const express = require('express');
const controller = require('../controller/category.controller');

const router = express.Router();

router.get('/:proId', controller.product);

module.exports = router;