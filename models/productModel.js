const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    category:{type:String,require:true},
    brand:{type:String,require:true},
    brand_category:{type:String,require:true},
    product_model:{type:String,require:true},
    price:{type:String,require:true},
    discount:{type:String,require:false},
    image:{type:String,require:true},
    date:{type:Date,require:true}
});


module.exports = mongoose.model('Product',productSchema);
