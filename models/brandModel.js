const mongoose = require("mongoose");

const brandModel = mongoose.Schema({
    category:{
        type:String,
        require:true
    },
    brand:{
        type:String,
        required:true
    },
    brandImage:{
        type:String,
        require:false
    },
    date:{
        type:Date,
        require:true
    }
});

module.exports = mongoose.model("brand",brandModel);