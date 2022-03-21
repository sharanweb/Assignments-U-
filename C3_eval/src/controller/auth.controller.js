const User = require("../model/user.model");
const {body,validationResult} = require("express-validator");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const newToken = (user)=>{
    return jwt.sign({user:user}.process.env.SECRET_KEY)
};

const register = ("",
   async(req,res)=>{
       try {
           //check for validation errors
           const errors = validationResult(req);
           if(!errors.isEmpty()){
               return res.status(400).json({errors: errors.array()});
           }

           //is user already exists
           let user = await User.findOne({emai: req.body.email});
           if(user){
            return res.status(400).json({message: "user already exists"});
           }

           //else create 
           user = await User.create(req.body);

           //generate a token
           const token = newToken(user);
       } catch (error) {
        return res.status(400).json({error: error.message});
       }
   }
);

module.exports = register;