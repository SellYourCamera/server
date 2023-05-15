const express = require("express");
const store_route = express();
const bodyparser = require("body-parser");
const path = require("path");
const multer= require("multer");
const store_controller = require("../controllers/storeController")

store_route.use(bodyparser.json());
store_route.use(bodyparser.urlencoded({extended:true}))

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

store_route.post('/create-store',store_controller.create_store);

module.exports = {store_route};