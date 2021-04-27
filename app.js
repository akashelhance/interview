const path = require('path');
const express= require('express')
const dotenv = require('dotenv');
const authroutes= require('./routes/auth')
const addressroutes= require('./routes/address')
const Imagesroutes= require('./routes/images')
const mergeroutes=require('./routes/merge')
var cors = require('cors')

  

const connectDB = require('./config/db');
const requiredLoggin = require("./middleware/requiredLogin")

// Load env vars
dotenv.config({ path: './config/config.env' });

// Connect to database

connectDB();
const app = express()
//Bosy parser- To read the data from the user:
app.use(express.static(__dirname + '/public'));

app.use(cors())

app.use(express.json());

app.use('/api/auth',authroutes)

app.use('/api/address',addressroutes)
app.use('/api/image',Imagesroutes)
app.use('/api/merge',mergeroutes)

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

