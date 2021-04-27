var jsonPatch = require('fast-json-patch')

const express = require("express");
const router = express.Router();

const dotenv = require('dotenv');


const requiredLoggin = require("../middleware/requiredLogin");

router.get('/', (req,res)=>{
  res.json({"msg": "The api is running auth"})
})


router.patch('/', requiredLoggin,(req,res)=>{
  const obj = req.body.object
  const patchobj=req.body.patch

  if(!obj){
      return res.json({"Message":"Json Object is required"})
  }
  else if (!patchobj){
      return res.json({"Message":"Json Patch Object is required"})
  }
           try {
               jsonPatch.applyPatch(obj, patchobj);
            return res.status(200).json({"New Document": obj})
           } catch (error) {
               return res.status(400).json({"Message": "Failed"})
           }

})

module.exports = router;
