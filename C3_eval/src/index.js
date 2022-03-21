const express = require('express');
const app = express();
app.use(express.json());
const {register,login }= require("./controller/auth.controller");
const {body, validationResult} = require("express-validator");
const commentController = require("./controller/comment.controller");
const bookController = require("./controller/book.controller");

//validation of the user registering
app.post("/register",
  body("firstName").not().isEmpty().isLength({min:3, max:30}).withMessage("min 3 and max 30 chars allowed"),
  body("lastName").not().isEmpty().isLength({min:3, max:30}).withMessage("min 3 and max 30 chars allowed"),
  body("age").isLength({min:1,max:3}).withMessage("No man has lived beyond 135 years").custom((value)=>{
    if(value<1 || value >100){
        throw new Error("Age should between 1 to 100");
    }
    return true;
}), register

);
//validation of the user logging in
app.post("/login",
  body("firstName").not().isEmpty().isLength({min:3, max:30}).withMessage("min 3 and max 30 chars allowed"),
  body("lastName").not().isEmpty().isLength({min:3, max:30}).withMessage("min 3 and max 30 chars allowed"),
  body("age").isLength({min:1,max:3}).withMessage("No man has lived beyond 135 years").custom((value)=>{
    if(value<1 || value >100){
        throw new Error("Age should between 1 to 100");
    }
    return true;
}), login

);
//create a post route to create comments.
app.use("/comment", commentController);
//create a post route to create books with 1 cover image.
app.use("/book", bookController);




module.exports = app;