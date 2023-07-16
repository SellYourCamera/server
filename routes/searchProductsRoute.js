const express = require("express");
const search_product_route = express();
const product_controller = require("../controllers/productController");
const bodyParser = require("body-parser");
const path = require("path");
const multer = require("multer");


search_product_route.use(bodyParser.json());
search_product_route.use(bodyParser.urlencoded({extended:true}));


search_product_route.get('/search/:key',product_controller.search_product);


module.exports = search_product_route;