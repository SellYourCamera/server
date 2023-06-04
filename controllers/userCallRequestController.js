
const userRequestModel = require("../models/userCallRequestModel");

const add_user_request = async (req,res) => {

    console.log(req.body.user_name);
    try {
        const add_user_req_data = new userRequestModel({
            user_name:req.body.user_name,
            user_email:req.body.user_email,
            phone:req.body.phone,
            cameraBrand:req.body.brand,
            date: Date.now(),
        });
        const saved_data= await add_user_req_data.save();
        res.status(200).send({
            success:true,
            message:"User Request Data Saved Successfully",
            data: saved_data
        })
    } catch (error) {
        res.status(400).send({success:false,msg:error.message});
    }
}
module.exports = {add_user_request};