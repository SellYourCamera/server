const brandModel = require("../models/brandModel");
const add_brand = async(req,res) => {
    try {
        const brand_data = await brandModel.find();
        if(brand_data.length > 0){
            let checking = false;
        for(let i=0;i<brand_data.length;i++){
            if(brand_data[i]['brand'].toLowerCase() === req.body.brand.toLowerCase()){
                checking = true;
                break;
            }
        }
        if (checking == false) {
            const add_brand = new brandModel({
                category:req.body.category,
                brand:req.body.brand,
                brandImage:req.file.filename,
                date:Date.now()
            });
            const brandData = await add_brand.save();
            res.status(200).send({success:true,msg:"Brand added successfully:",data:brandData});
        } else {
            res.status(400).send({success:false,msg:"Brand ("+req.body.brand+") already exist:"});
        }
        }else{
            const add_brand = new brandModel({
                category:req.body.category,
                brand:req.body.brand,
                brandImage:req.file.filename || null,
                date:Date.now()
            });
            const brandData = await add_brand.save();
            res.status(200).send({success:true,msg:"Brand added successfully:",data:brandData});

        }
        
    } catch (error) {
        res.status(400).send({success:false,msg:error.message});
    }
}

module.exports = {add_brand}