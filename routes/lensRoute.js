const express = require("express");
const lens_route = express();
const lens_controller = require("../controllers/lensController")
const bodyParser = require("body-parser");
const path = require("path");

lens_route.use(bodyParser.json());
lens_route.use(bodyParser.urlencoded({extended:true}));

//adding category

lens_route.post('/add-lens',lens_controller.add_lens);

//getting categories

lens_route.get('/get-lens-by-brand',lens_controller.get_lens_by_brand);


module.exports = lens_route;