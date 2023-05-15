const lensModel = require("../models/lensModel");

const add_lens = async (req, res) => {
    try {
        // var arrImg = [];
        //  for(let i=0;i<=req.files.length;i++){
        //      arrImg[i]=req.files[i].filename;
        //  }

        const lens_data = await lensModel.find();
        if (lens_data.length > 0) {
            let checking = false;
            for (let i = 0; i < lens_data.length; i++) {
                if (lens_data[i]['lens_model'].toLowerCase() === req.body.lens_model.toLowerCase()) {
                    checking = true;
                    break;
                }
            }
            if (checking == false) {
                const lens_data = new lensModel({
                    brand: req.body.brand.toUpperCase(),
                    lens_model: req.body.lens_model,
                    price: req.body.price,
                    date: Date.now()
                });
                const lensData = await lens_data.save();
                res.status(200).send({ success: true, msg: "Lens added successfully:", data: lensData });
            } else {
                res.status(400).send({ success: false, msg: "Lens (" + req.body.brand + " " + req.body.lens_model + ") already exist:" });
            }
        } else {
            const lens_data = new lensModel({
                brand: req.body.brand.toUpperCase(),
                lens_model: req.body.lens_model,
                price: req.body.price,
                date: Date.now()
            });
            const lensData = await lens_data.save();
            res.status(200).send({ success: true, msg: "Lens added successfully:", data: lensData });

        }

    } catch (error) {
        res.status(400).send({ success: false, msg: error.message });
    }
}


const get_lens_by_brand = async (req, res) => {
    try {
        var lens_data = [];
        const brandName = req.query.brandName;
        const lens_model = req.query.lens_model;

        if (!brandName && !lens_model) {
            return res.status(400).send({ success: false, msg: "Please provide either brandName or product_model" });
        }

        const filter = {};
        if (brandName) {
            filter.brand = brandName.toUpperCase();
        }
        if (lens_model) {
            filter.lens_model = lens_model;
        }

        const lens = await lensModel.find(filter);

        if (lens.length > 0) {
            lens.forEach(lens => {
                lens_data.push({
                    "brand": lens["brand"],
                    "lens_model": lens["lens_model"],
                    "price": lens["price"],
                    "date": lens["date"]
                });
            });

            res.status(200).send({ success: true, msg: "Data sent successfully", data: lens_data });
        } else {
            res.status(200).send({ success: false, msg: "Lens not found" });
        }
    } catch (error) {
        res.status(400).send({ success: false, msg: error.message });
    }
}

module.exports = {get_lens_by_brand, add_lens };