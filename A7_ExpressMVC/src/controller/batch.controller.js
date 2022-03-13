const express = require("express");
const router = express.Router();
const Batch = require("../model/batch.model");  //imported from models

//____________Batch CRUD____________________//
//bc - 1  : getting the data from server
router.get("", async(req,res) =>{
    try {
        const batches = await Batch.find().lean().exec();
        return res.status(200).send({batches:batches});
    } catch (error) {
        console.log(error);
        return res.status(500).send("Please Try After Some Time");
    }
});

//bc - 2  : posting the data on the server
router.post("", async(req,res)=>{
    try {
        const batches = await Batch.create(req.body);
        return res.status(201).send(batches);
    } catch (error) {
        console.log(error);
        return res.status(500).send({error: error});
    }
});

module.exports = router;
