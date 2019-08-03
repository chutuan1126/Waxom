const product = require('../models/product.model');

module.exports.product = async (req, res) => {
    let proId = req.params.proId;

    var products = await product.find({proId: proId});
        res.render('home', { 
            product: products
        });
}