const express = require("express");
const fs = require("fs");
const User = require("../model/user.model");
const upload = require("../middleware/upload");


const router = express.Router();

router.post("/",upload.single("profile_pic"),async(req,res)=>{   //profile pic as in schema  cannot to req.body
    try {
        const user = await User.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            profile_pic: req.file.path    //req.file provoded by multer we need url so path
        });
        return res.status(201).send(user);
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
});

router.get("", async (req, res) => {
    try {
      const users = await User.find().lean().exec();
      res.status(200).send(users);
    } catch (e) {
      return res.status(500).json({message: e.message });
    }
});

router.get("/:id",upload.single("profile_pic"),async(req,res)=>{
    try {
        const user = await User.findById(req.params.id).lean().exec();
        return res.status(201).send(user);
    } catch (error) {
        return res.status(500).json({message: e.message });
    }
});

router.patch("/:id",upload.single("profile_pic"),async(req,res)=>{
    try {
        if(req.file.path === undefined){
            const user = await User.findByIdAndUpdate(req.params.id, req.body,{new:true}).lean().exec();
            return res.status(201).send(user);
        }else{
            const singleUser = await User.findById(req.params.id).lean().exec();
            fs.unlinkSync(singleUser.profile_pic,()=>{
                console.log("delete synchronusly");
            });

            const user = await User.findByIdAndUpdate(req.params.id,
                {
                first_name: req.params.first_name,
                last_name: req.params.last_name,
                profile_pic: req.file.path
               },
               {
                   new: true
               } 
            ).lean().exec();
            return res.status(201).send(user);
        }
    } catch (error) {
        return res.status(500).json({message: e.message });
    }
});

router.delete("/:id",async(req,res)=>{
    try {
        const singleUser = await User.findById(req.params.id).lean().exec();
        fs.unlinkSync(singleUser.profile_pic);
        const user = await User.findByIdAndUpdate(req.params.id).lean().exec();
        return res.status(201).send(user);

    } catch (error) {
        return res.status(500).json({message: e.message });
    }
});

module.exports = router;