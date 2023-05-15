const userModel = require("../models/usermodel");

const register_user = async(req,res) => {
    try {
        const new_user = new userModel({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,
            mobile:req.body.mobile
        });

        const userData = await userModel.findOne({email:req.body.email});
        if (userData) {
            res.status(200).send({success:false,msg:"email already exist"});
        } else {
            const user_Data = await new_user.save(function(err,result){
                if (err){
                    console.log(err);
                }
                else{
                    console.log(result)
                }
            });
            res.status(200).send({success:true,data:user_Data})
            
        }

    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {register_user};