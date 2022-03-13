const express = require("express");
const router = express.Router();
const User = require("../model/user.model");

//-------------Users CRUD--------------------//
//uc - 1  : getting the data from server
router.get("", async(req,res) =>{
    try {
        const users = await User.find().lean().exec();
        return res.status(200).send({users:users});
    } catch (error) {
        console.log(error);
        return res.status(500).send("Please Try After Some Time");
    }
});

//uc - 2  : posting the data on the server
router.post("", async(req,res)=>{
    try {
        const users = await User.create(req.body);
        return res.status(201).send(users);
    } catch (error) {
        console.log(error);
        return res.status(500).send({error: error});
    }
});

module.exports = router;