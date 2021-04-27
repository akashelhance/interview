const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types
const AddressSchema = new mongoose.Schema({
    AddressOff:{
        type:ObjectId,
        ref:"User"
     },
    houseno: {
        type: String,
        required: true,
    },
    city: {

    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true
  },

 
  
});

module.exports=mongoose.model("Address",AddressSchema)