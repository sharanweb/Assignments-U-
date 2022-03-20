const express = require("express");
const app = express();
module.exports = app;

app.use(express.json());

const userController = require("./controller/user.controller");
const galleryController = require("./controller/gallery.controller");

app.use("/users",userController);
app.use("/gallery",galleryController);