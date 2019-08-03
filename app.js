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

// try {
//   await mongoose.connect('mongodb://localhost:27017/mongo-demo', { useNewUrlParser: true });
// } catch (error) {
//   handleError(error);
// }

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser('wed23fhkj545iew76wuh234w'));
app.use(express.static('public'));
app.use(sissionMiddleware);

const port = 3030;
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