const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const dotenv = require('dotenv');

const requiredLoggin = require("../middleware/requiredLogin")
const Jimp = require('jimp');
const app = express()
const path = require('path');

//Bosy parser- To read the data from the user:

app.use(express.static(__dirname + '/public'));



router.post('/thumbnail',requiredLoggin, async(req,res)=>{
    const photo =req.body.photo;
    if (!photo){
        return res.json({"Message" : "The image is required"})
    }
      try {
       
           const image = await Jimp.read(photo );
  // Resize the image to width 150 and heigth 150.
  const newImage= await image.resize(50, 50);

  await image.writeAsync(`public/${'resize'}.png`);

    const imageThumb = `${'resize'}.png`
    console.log(imageThumb)
 
    return res.sendfile(path.resolve(path.resolve(__dirname, `../public/${imageThumb}`)));

      } catch (error) {
          return res.json({"Message": "Error"})
      }

 
})




module.exports = router;
