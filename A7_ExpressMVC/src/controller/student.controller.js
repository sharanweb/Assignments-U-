const express = require("express");
const router = express.Router();
const Student = require("../model/student.model");

//_______________Student Crud_______________//
//sc - 1  : getting the data from server
router.get("", async(req,res) =>{
    try {
        const students = await Student.find()
          .populate({path:"user_id", select:{first_name:1, last_name:1,}})
          .populate({path:"evaluation_id",select:["dat_of_evaluation"],
             populate:[
                 {path:"instructor_details",select:["first_name","last_name"]},
                 {path:"batch_id",select:["batch_name"]}
                ]
            })
          .lean()
          .exec();
        return res.status(200).send({students:students});
    } catch (error) {
        console.log(error);
        return res.status(500).send("Please Try After Some Time");
    }
});

//sc - 2  : posting the data on the server
router.post("", async(req,res)=>{
    try {
        const students = await Student.create(req.body);
        return res.status(201).send(students);
    } catch (error) {
        console.log(error);
        return res.status(500).send({error: error});
    }
});

module.exports = router;