const express = require("express");
const brand_route = express();
const brand_controller = require("../controllers/brandController");
const bodyParser = require("body-parser");
const path = require("path");
const multer = require("multer");

brand_route.use(bodyParser.json());
brand_route.use(bodyParser.urlencoded({extended:true}));

//add image to brand
const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.join(__dirname,'../public/storeImage'),function(error,success){
            if(error) throw error;
        });
    },
    filename: function(req,file,cb){
        const name = Date.now()+'-'+file.originalname;
        cb(null,name,function(error,success){
            if(error) throw error
        });
    }
});

const upload = multer({storage:storage});

brand_route.post('/add-brand',upload.single('brandImage'),brand_controller.add_brand);

module.exports = brand_route;