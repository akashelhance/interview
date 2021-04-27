const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const Address = require("../models/Address");
// const bcrypt = require("bcryptjs");
// const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const requiredLoggin = require("../middleware/requiredLogin");


router.get('/',requiredLoggin, (req,res)=>{
    res.json({"msg": "The address going"})
  })

router.post(
    "/add",requiredLoggin,
    
    // check("Name", "Name is required").notEmpty(),
    check("houseno", "houseno is required").notEmpty(),
    check("city", "City is required").notEmpty(),
    check("state", "States is required").notEmpty(),
    async (req, res, next) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
              return res.status(400).json({ errors: errors.array() });
            }
            const {houseno,city,state} = req.body 
            req.user.password = undefined
            const address= new Address({
                AddressOff:req.user,
              houseno,
              city,
              state,
              // photo:pic,
     
              })
      
              await address.save();
              return res.send(address)
           } catch (error) {
                return res.send({"message": "failed"})
           }
      } 
  );


  module.exports = router;
