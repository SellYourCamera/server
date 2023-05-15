const express = require("express");
const user_route = express();
const user_controller = require("../controllers/userController");
const bodyParser = require("body-parser");

user_route.use(bodyParser.json());
user_route.use(bodyParser.urlencoded({extended:true}));

user_route.post('/register',user_controller.register_user);

const multer = require("multer");
const path = require("path");


module.exports = user_route;