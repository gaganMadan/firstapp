// Dependencies 
var express = require('express');
var router = express.Router();

//Models
var Product = require('../models/product');

// Routes
// router.get('/products', function( req,res ){
//     res.send('api is working');
// })
Product.methods(['get','put','post','delete']);
Product.register(router, '/products');

// Return router
module.exports = router;