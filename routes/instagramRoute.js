const express = require("express");
const insta_route = express();
const insta_feed_controller = require("../controllers/instagramFeed");
const bodyParser = require("body-parser");
const path = require("path");
const multer = require("multer");

insta_route.use(bodyParser.json());
insta_route.use(bodyParser.urlencoded({extended:true}));

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

insta_route.post('get_insta_feed',insta_feed_controller.get_insta_feed);

module.exports = insta_route;