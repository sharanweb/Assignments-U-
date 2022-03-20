const express = require("express");
const User = require("../model/user.model");
const router = express.Router();
// const sendMail = require("../utils/send");

router.get("/",async(req,res)=>{
    try {
        const page = +req.query.page || 1;
        const size = +req.query.size || 2;
        const skip = ((page-1)*size);
        const users = await User.find().skip(skip).limit(size).lean().exec();
        const totalPages = Math.ceil((await User.find(query).countDocuments())/size);
        return res.send({users, totalPages});
    } catch (error) {
        return res.status(500).send({message: error.message});
    }
});

//sending the mail