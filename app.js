const morgan = require('morgan');
const express = require('express');
const cookieParser = require('cookie-parser');
const  mongoose = require('mongoose');
const assert = require('assert');
const product = require('./models/product.model');

// require router
const userRoute = require('./route/user.route');
const authRoute = require('./route/auth.route');
const cartRoute = require('./route/cart.route');
const productRoute = require('./route/product.route');
const categoryRoute = require('./route/category.route');

//middleware
const authMiddleware = require('./middleware/auth.middleware');
const sissionMiddleware = require('./middleware/session.middleware');

const app = express();
mongoose.connect('mongodb://localhost/mongo-demo', {useNewUrlParser: true})
.catch(error => handleError(error));

app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser('wed23fhkj545iew76wuh234w'));
app.use(express.static('public'));
app.use(sissionMiddleware);

const port = 3000;
const hostname = 'localhost';

//view engine
app.set('view engine', 'pug');
app.set('views', './views');

app.get('/', (req, res) => {
  product.find({}, (err, product) => {
    assert.equal(null, err);

    res.render('home', { product: product });
  });
});

//use router
app.use('/auth', authRoute);
app.use('/category', categoryRoute);
app.use('/cart', cartRoute);
app.use('/users', authMiddleware.requireAuth, userRoute);
app.use('/product', authMiddleware.requireAuth, productRoute);

//port listen
app.listen(port, hostname, () => {
  console.log(`server listening on http://${hostname}:${port}`);
});