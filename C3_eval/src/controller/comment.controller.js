const express = require("express");
const router = express.Router();



router.post("/",async(req,res)=>{
    try {
        const comment = await Comment.create(req.body);
        return res.status(200).send({ comment });
    } catch (error) {
        return res.status(500).send(error.message);
    }
});

module.exports = router