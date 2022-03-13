const express = require("express");
const router = express.Router();
const Evaluation = require("../model/evaluation.model");

//_____________________Evaluation CRUD__________________//
//ec - 1  : getting the data from server
router.get("", async(req,res) =>{
    try {
        const evaluations = await Evaluation.find().populate("instructor_details").populate("batch_id").lean().exec();
        return res.status(200).send({evaluations:evaluations});
    } catch (error) {
        console.log(error);
        return res.status(500).send("Please Try After Some Time");
    }
});

//ec - 2  : posting the data on the server
router.post("", async(req,res)=>{
    try {
        const evaluations = await Evaluation.create(req.body);
        return res.status(201).send(evaluations);
    } catch (error) {
        console.log(error);
        return res.status(500).send({error: error});
    }
});

module.exports = router;