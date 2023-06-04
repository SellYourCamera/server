const mongoose = require("mongoose");

const userRequest = mongoose.Schema({
    user_name:{
        type:String,
        required: true,
    },
    user_email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true,
    },
    cameraBrand:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        require:true
    }
});

module.exports = mongoose.model('UserCallRequest',userRequest)