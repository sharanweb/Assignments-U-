const express = require("express");
const router = express.Router();
const Submission = require("../model/submission.model");

//_____________________Submissions CRUD__________________//
//suc - 1  : getting the data from server
router.get("", async(req,res) =>{
    try {
        const submissions = await Submission.find()
          .populate({path:"student_id",select:["roll_id","current_batch"],
              populate:[
                  {path:"user_id",select:["first_name","last_name"]},
                  {path:"evaluation_id", select:["date_of_evaluation"],
                    populate:{path:"instructor_details",select:["first_name","last_name"]}
                  }
                ]
           })
          .lean()
          .exec();
        return res.status(200).send({submissions:submissions});
    } catch (error) {
        console.log(error);
        return res.status(500).send("Please Try After Some Time");
    }
});

//suc - 2  : posting the data on the server
router.post("", async(req,res)=>{
    try {
        const submissions = await Submission.create(req.body);
        return res.status(201).send(submissions);
    } catch (error) {
        console.log(error);
        return res.status(500).send({error: error});
    }
});

module.exports = router;