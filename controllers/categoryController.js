const categoryModel = require("../models/categoryModel");
const addCategory = async(req,res) => {
    try {
        //to find the categories from category collection
        const category_data = await categoryModel.find();
        if(category_data.length > 0){
            let checking = false;
            //for sserching the requested data
            for(let i=0;i<category_data.length;i++){
                if(category_data[i]['category'].toLowerCase() === req.body.category.toLowerCase()){
                    checking= true;
                    break;
                }
            }

            if (checking == false) {
                const category = new categoryModel({
                    category:req.body.category
                });
                const cat_save = await category.save();
                res.status(200).send({success:true,msg:"Category Added Successfully:",data:cat_save});
    
            } else {
                res.status(400).send({success:false,msg:"Category ("+req.body.category+") already exist:"});                
            }


        }else{
            const category = new categoryModel({
                category:req.body.category
            });
            const cat_data = await category.save();
            res.status(200).send({success:true,msg:"Category Added Successfully:",data:cat_data});
        }
        
        
    } catch (error) {
        res.status(400).send({success:false,msg:error.message});
    }
}

//to get category
const getCategory = async (req,res) =>{
    try {
        return await categoryModel.find();
    
    } catch (error) {
        res.status(400).send({success:false,msg:error.message})
    }
}


module.exports = {
    addCategory,
    getCategory
}