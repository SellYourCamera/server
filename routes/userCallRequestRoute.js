const express = require("express");
const user_call_request = express();
const bodyParser = require("body-parser");
const userCallRequestController = require("../controllers/userCallRequestController")

user_call_request.use(bodyParser.json());
user_call_request.use(bodyParser.urlencoded({extended:true}));

user_call_request.post('/userCallRequest',userCallRequestController.add_user_request);

const multer = require("multer");
const path = require("path");


module.exports = user_call_request;