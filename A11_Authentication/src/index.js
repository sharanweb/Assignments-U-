const express = require("express");
const app = express();
app.use(express.json());
const { register, login } = require("./controller/auth.controller");

const { body, validationResult } = require("express-validator");

const postController = require("./controller/post.controller");

//register validation

app.post("/register",
  body("email").custom(async(value)=>{
    const pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(value);
    if(!pattern){
        throw new Error("Please Enter a proper email address");
    }
    return true;
  }),
  body("password").custom(async(value)=>{
    const pass = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value);
    if(!pass){
        throw new Error("Minimum eight characters, at least one letter and one number");
    }
    return true;
  }),register
);

//login validation
app.post("/login",
  body("email").custom(async(value)=>{
    const pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(value);
    if(!pattern){
        throw new Error("Please Enter a proper email address");
    }
    
    return true;
  }),
  body("password").custom(async(value)=>{
    const pass = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value);
    if(!pass){
        throw new Error("Minimum eight characters, at least one letter and one number");
    }
    return true;
  }),login
);




module.exports = app;
