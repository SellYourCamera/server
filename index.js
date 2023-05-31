const express = require("express");
const mongoose = require('mongoose');
require('dotenv').config();
mongoose.set('strictQuery', false);
const app = express();
const user_route = require("../Server/routes/userRoute");
const { store_route } = require('./routes/storeRoute');
const category_route = require("./routes/categoryRoute");
const brandRoute = require("./routes/brandRoute");
const productRoute = require("./routes/productRoute");
const cors = require('cors');
const lensRoute = require("./routes/lensRoute");
const userCallRequestRoute =require("./routes/userCallRequestRoute")


// database connection

// Enable CORS
const allowedOrigins = [
    'https://sellyourcamera.in:3000'
   
    
    // Add more allowed origins here
  ];
  
  app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });


  //allow cors

  app.use(
    cors({
        origin: 'https://sellyourcamera.in:3000',
        credentials:true,
        methods: ["GET","POST","PUT","DELETE"]
    })
  );

try {
 mongoose.connect('mongodb+srv://vg9557755504:Camera%40Market@cameramarket.j2jlkbo.mongodb.net/SellYourCamera', { useNewUrlParser: true });
} catch (error) {
    console.error(error);
}
app.use(express.json());


// app.get("/:universalURL", (req, res) => {
//     res.send("404 URL NOT FOUND");
//  });

 app.get("/", (req, res) => {
    res.send("Server started");
 });

app.listen(3001,() => {
    console.log(`Server Started at 3001`);

})
//user router
app.use('/api',user_route);
//store router
app.use('/api',store_route);
//category route
 app.use('/api',category_route);
// //brand add
app.use('/api',brandRoute);
//to add products
app.use('/api',productRoute);
//to add lens data
app.use('/api',lensRoute);
//to add user call request
app.use('/api',userCallRequestRoute);

