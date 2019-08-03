const express = require('express');
const controller = require('../controller/product.controller');
const multer  = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads');
    },
    filename: function (req, file, cb) {
      cb(null, '/' + file.originalname);
    }
  })
   
  const upload = multer({ storage: storage });

const router = express.Router();

router.get('/', controller.product);

router.get('/addproduct', controller.addProduct);

router.post('/addproduct', upload.single('avatar') , controller.postAddProduct);

router.get('/view/:id', controller.view);

router.post('/delete/:id', controller.postDelete);

router.get('/edit/:id', controller.getEdit);

router.post('/edit/:id', upload.single('avatar'), controller.postEdit);

module.exports = router;