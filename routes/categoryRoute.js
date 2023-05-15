const express = require("express");
const category_route = express();
const category_controller = require("../controllers/categoryController");
const bodyParser = require("body-parser");
const path = require("path");

category_route.use(bodyParser.json());
category_route.use(bodyParser.urlencoded({extended:true}));

//adding category

category_route.post('/add-category',category_controller.addCategory);

//getting categories

category_route.get('/get-category',category_controller.getCategory);


module.exports = category_route;