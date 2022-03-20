const express = require("express");
const Gallery = require("../model/gallery.model");
const upload = require("../middlewares/upload");
const router = express.Router();
const fs = require("fs");

router.post("/", upload.any("images"), async (req, res) => {    //any for multiple given by multer
  const filePaths = req.files.map((file) => file.path);
  try {
    const gallery = await Gallery.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      user_id: req.body.user_id,
      pictures: filePaths,        //multer gives all paths
    }); 

    return res.status(201).json({ gallery });
  } catch (e) {
    return res.status(500).json({ status: "failed", message: e.message });
  }
});

router.get("/", async (req, res) => {
  try {
    // const gallery = await Gallery.find().populate({path: "user_id", select: "first_name last_name"}).lean().exec();
    const gallery = await Gallery.find().lean().exec();
    res.status(201).send(gallery);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    // const gallery = await Gallery.find().populate({path: "user_id", select: "first_name last_name"}).lean().exec();
    const gallery = await Gallery.findById(req.params.id).lean().exec();
    res.status(201).send(gallery);
  } catch (error) {
    return res.status(500).json({message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    // const gallery = await Gallery.find().populate({path: "user_id", select: "first_name last_name"}).lean().exec();
    const gallery = await Gallery.findByIdAndUpdate(req.params.id).lean().exec();
    res.status(201).send(gallery);
  } catch (error) {
    return res.status(500).json({message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const gallery = await Gallery.findByIdAndDelete(req.params.id).lean().exec();
    res.send(gallery);

    for (let i = 0; i < gallery.pictures.length; i++) {  //foeeach can also be used
      fs.unlinkSync(gallery.pictures[i]); //synchronously remove a file or symbolic link 
    }
  } catch (error) {
    return res.status(500).json({message: error.message });
  }
});

module.exports = router;

