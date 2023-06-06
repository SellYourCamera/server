const productModel = require("../models/productModel");
const categoryController = require("../controllers/categoryController");
const add_product = async (req, res) => {
    try {
        // var arrImg = [];
        //  for(let i=0;i<=req.files.length;i++){
        //      arrImg[i]=req.files[i].filename;
        //  }

        const product_data = await productModel.find();
        if (product_data.length > 0) {
            let checking = false;
            for (let i = 0; i < product_data.length; i++) {
                if (product_data[i]['product_model'].toLowerCase() === req.body.product_model.toLowerCase()) {
                    checking = true;
                    break;
                }
            }
            if (checking == false) {
                const product_data = new productModel({
                    category: req.body.category,
                    brand: req.body.brand,
                    brandCategory: req.body.brandCategory,
                    product_model: req.body.product_model,
                    price: req.body.price,
                    discount: req.body.discount,
                    image: req.body.image,
                    date: Date.now()
                });
                const productData = await product_data.save();
                res.status(200).send({ success: true, msg: "Product added successfully:", data: productData });
            } else {
                res.status(400).send({ success: false, msg: "Product (" + req.body.brand_category + " " + req.body.product_model + ") already exist:" });
            }
        } else {
            const product_data = new productModel({
                category: req.body.category,
                brand: req.body.brand,
                brand_category: req.body.brandCategory,
                product_model: req.body.product_model,
                price: req.body.price,
                discount: req.body.discount,
                image: req.body.image,
                date: Date.now()
            });
            const productData = await product_data.save();
            res.status(200).send({ success: true, msg: "Product added successfully:", data: productData });

        }

    } catch (error) {
        res.status(400).send({ success: false, msg: error.message });
    }
}

const get_product = async (req, res) => {
    try {
        var product_data = [];
        var cat_data = await categoryController.getCategory();

        if (cat_data.length > 0) {
            for (let i = 0; i < cat_data.length; i++) {
                var brand_Category = cat_data[i]['category'];
                var products = await productModel.find({ category: brand_Category });

                if (products.length > 0) {
                    products.forEach(product => {
                        product_data.push({
                            "category": product["category"],
                            "brand": product["brand"],
                            "product_model": product["product_model"],
                            "price": product["price"],
                            "date": product["date"],
                            "image":product["image"]
                        });
                    });
                }
            }

            if (product_data.length > 0) {
                res.status(200).send({ success: true, msg: "Data sent successfully", data: product_data });
            } else {
                res.status(200).send({ success: false, msg: "Products not found" });
            }
        } else {
            res.status(200).send({ success: false, msg: "Product categories not found" });
        }
    } catch (error) {
        res.status(400).send({ success: false, msg: error.message });
    }
}


// const get_prodiuct = async (req,res) =>{
//     try {
//         var send_data = [];
//         var cat_data = await categoryController.getCategory();

//         if(cat_data.length>0){
//             for(let i=0;i<cat_data.length;i++){
//                 var product_Data = [];
//                 var brand_Category = cat_data[i]['category'];
//                 var product = await product_model.find({category:brand_Category});

//                 if (product.length>0) {
//                     for (let j = 0; j < product.length; j++) {
//                         product_Data.push(
//                             {
//                                 "category": product[j]["category"],
//                                 "brand": product[j]["brand"],
//                                 "product_model": product[j]["product_model"],
//                                 "price": product[j]["price"],

//                                 "date":product[j]["date"],
//                               }
//                         )

//                     }
//                 } else {
//                     res.status(200).send({success:false,msg:"product not found in this category"})
//                 }
//             }
//             res.status(200).send({success:true,msg:"data send successfully",data:product_Data})
//         }else{
//             res.status(200).send({success:false,msg:"Product category not found"})
//         }

//     } catch (error) {

//     }
//}


//get product by brand

const get_product_by_brand = async (req, res) => {
    try {
        var product_data = [];
        const brandName = req.query.brandName;
        const product_Model = req.query.product_model;

        if (!brandName && !product_Model) {
            return res.status(400).send({ success: false, msg: "Please provide either brandName or product_model" });
        }

        const filter = {};
        if (brandName) {
            filter.brand = brandName.toUpperCase();
        }
        if (product_Model) {
            filter.product_model = product_Model;
        }

        const products = await productModel.find(filter);

        if (products.length > 0) {
            products.forEach(product => {
                product_data.push({
                    "category": product["category"],
                    "brand": product["brand"],
                    "product_model": product["product_model"],
                    "price": product["price"],
                    "date": product["date"],
                    "image": product["image"],
                });
            });

            res.status(200).send({ success: true, msg: "Data sent successfully", data: product_data });
        } else {
            res.status(400).send({ success: false, msg: "Products not found" });
        }
    } catch (error) {
        res.status(400).send({ success: false, msg: error.message });
    }
}

module.exports = { add_product, get_product, get_product_by_brand }