const path = require('path');
const express= require('express')
const dotenv = require('dotenv');
const authroutes= require('./routes/auth')
const addressroutes= require('./routes/address')

var cors = require('cors')
var fs = require('fs');
var multer = require('multer');
var sharp = require('sharp');
  
var upload = multer({dest : './images'}) 
const connectDB = require('./config/db');
const requiredLoggin = require("./middleware/requiredLogin")

// Load env vars
dotenv.config({ path: './config/config.env' });

// Connect to database

connectDB();
const app = express()
//Bosy parser- To read the data from the user:
app.use(cors())

app.use(express.json());
// Mouting the users:
app.get('/' , requiredLoggin, (req,res)=>{
    res.send("hello")
})
  
app.post('/api/image/upload',requiredLoggin, upload.single("avatar"), (req, res)=>
{
    fs.rename(req.file.path, './images/avatar.jpg', (err)=>{
        console.log(err);
    })
  
    sharp(__dirname + '/images/avatar.jpg').resize(50,50)
    .jpeg({quality : 50}).toFile(__dirname 
        + '/images/avatar_thumb.jpg');


    const imageThumb = __dirname 
    + '/images/avatar_thumb.jpg'
    console.log(imageThumb)
  
    res.sendFile(imageThumb)
    
});
  

app.use('/api/auth',authroutes)

app.use('/api/address',addressroutes)

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  // server.close(() => process.exit(1));
});

