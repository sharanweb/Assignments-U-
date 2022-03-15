const express = require("express");
const app = express();
module.exports = app;

app.use(express.json());

const userController = require("./controller/user.controller");

app.use("/users",userController);