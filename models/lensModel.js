const mongoose = require("mongoose");

const lensModel = mongoose.Schema(
    {
        brand:{
            type:String,
            require:true
        },
        lens_model:{
            type:String,
            require:true
        },
        price:{
            type:String,
            require:true
        },
        date:{
            type:Date,
            require:true
        }
    }
)

module.exports = mongoose.model('lens',lensModel);