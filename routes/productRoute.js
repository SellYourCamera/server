const express = require("express");
const product_route = express();
const product_controller = require("../controllers/productController");
const bodyParser = require("body-parser");
const path = require("path");
const multer = require("multer");


product_route.use(bodyParser.json());
product_route.use(bodyParser.urlencoded({extended:true}));

//add image to brand
const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.join(__dirname,'../public/productImage'),function(error,success){
            if(error) throw error;
        });
    },
    filename: function(req,file,cb){
        const name = file.originalname;
        cb(null,name,function(error,success){
            if(error) throw error
        });
    }
});

const upload = multer({storage:storage});

product_route.post('/add-product',upload.array('images'),product_controller.add_product);

//to get product data from product_controller

product_route.get('/get-product',product_controller.get_product)

// //to get product by brand

// product_route.get('/get-model-product',product_controller.get_product_by_modal );


//to get product by brand

product_route.get('/get-category-product',product_controller.get_product_by_filter );

module.exports = product_route;