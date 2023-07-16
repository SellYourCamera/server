const express = require("express");
const mongoose = require('mongoose');
require('dotenv').config();
mongoose.set('strictQuery', false);
const app = express();
const user_route = require("./routes/userRoute");
const { store_route } = require('./routes/storeRoute');
const category_route = require("./routes/categoryRoute");
const brandRoute = require("./routes/brandRoute");
const productRoute = require("./routes/productRoute");
const instaRoute = require('./routes/instagramRoute')
const cors = require('cors');
const lensRoute = require("./routes/lensRoute");
const userCallRequestRoute =require("./routes/userCallRequestRoute");
const serachProductsRoute = require("./routes/searchProductsRoute");
const axios = require('axios');
const search_product_route = require("./routes/searchProductsRoute");


// Enable CORS for all routes
app.use(cors());

// Enable CORS
const allowedOrigins = [
  'http://sellyourcamera.in',
  'http://www.sellyourcamera.in',
  'https://sellyourcamera.in',
  'https://www.sellyourcamera.in',
  'http://localhost',
    
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

  // app.use((req, res, next) => {
  //   res.setHeader('Access-Control-Allow-Origin', 'https://www.sellyourcamera.in');
  //   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  //   res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  //   next();
  // });
  

  //reset cookies

  app.use((req, res, next) => {
    if (req.query.reload === 'true' || req.headers['x-reload'] === 'true') {
      // Clear the necessary cookies
      res.clearCookie('myCookie');
      // Add more cookie clearing logic if needed
  
      // Optionally, perform other actions or updates
  
      // Redirect back to the same URL without the reload parameter/header
      const { protocol, hostname, originalUrl } = req;
      const urlWithoutReload = `${protocol}://${hostname}${originalUrl.split('?')[0]}`;
      return res.redirect(urlWithoutReload);
    }
  
    next();
  });

  //instagram feed

  // app.get('/instagram-feed', async (req, res) => {
  //   try {
  //     const accessToken = 'IGQVJWNm1Va0ZAmU2twWlNDZA0NyMjNHLVFEUm8ySEdMckZAoYUNjY1luVHRFNEY2dEFON0l0bTNZAU04zdmlYME9FZAUk1enJiWHZAPT0x2Qy1zemJPaERLWEVrd1pEYllsaUluaVZAXd1hmeTlzbTgwOUJpOAZDZD';
  //    // const apiUrl = `https://api.instagram.com/v1/users/self/media/recent/?access_token=${accessToken}`;
  //     const apiUrl = `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink&access_token=${accessToken}`;      
  //     const response = await axios.get(apiUrl);
  //     const feedData = response.data;
  
  //     // You can process the feedData further or send it as it is to the frontend
  //     res.json(feedData);
  //     res.status(200).send({success: true, msg: "Data sent successfully", data: response.data})
  //   } catch (error) {
  //     console.error('Error fetching Instagram feed:', error);
  //     res.status(500).json({ error: 'Failed to fetch Instagram feed' });
  //   }
  // });
  

try {
 mongoose.connect('mongodb+srv://vg9557755504:Camera%40Market@cameramarket.j2jlkbo.mongodb.net/SellYourCamera', { useNewUrlParser: true });
//  mongoose.connect('mongodb://localhost:27017/CamMart', { useNewUrlParser: true });
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
//to fetch instagram feeds
app.use('/api',instaRoute);
//to search product
// app.use('/api',search_product_route);

