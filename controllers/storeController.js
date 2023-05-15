const store = require("../models/storeModel");
const user = require("../models/usermodel");

const create_store = async(req,res) => {

    try {
        const userData = await user.findOne({ _id:req.body.vendor_id});
        if (userData) {
            if(!req.body.latitude || !req.body.longitute){
                res.status(200).send({sucess:false,msg:'location not found'})
            }else{
                const vendorData = await store.findOne({vendor_id:req.body.vendor_id});
                if(vendorData){res.status(200).send({success:false,msg:'vendor already exist:'})}
                else{
                    const store = new Store({
                        vendor_id:req.body.vendor_id,
                        logo:req.body.logo,
                        bussiness_email:req.body.bussiness_email,
                        address:req.body.address,
                        pin:req.body.pin,
                        location:{
                            type:"point",
                            cordinates:[parseFloat(req.body.longitute),parseFloat(req.body.latitude)]
                        }

                    });
                    const storeData = await store.save();
                    res.status(200).send({success:false,msg:'store data',data:storeData})
                }
            }
            
        } else {
            res.status(200).send({sucess:false,msg:"vendor ID not found"})
        }
    } catch (error) {
        res.status(400).send(error.nessage);
    }

}

module.exports= {create_store}