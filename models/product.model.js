const  mongoose = require('mongoose');

var product = new mongoose.Schema({
    proName: String,
    proContent: String,
    proPrice: String,
    avatar: String,
    proId: String
});

var product = mongoose.model('product', product, 'product');

module.exports = product;