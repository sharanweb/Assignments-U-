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

const login = async(req,res) =>{
    try {
        //check for email exists or not
        let user = await User.findOne({email:req.body.mail}).lean().exec();

        if(!user){
            return res.status(400).json({
                message:"Email doesnot Exists try different"
            });
        }

        //match the passwords
        const match = await user.checkPassword(req.body.passowrd);
        if(!user){
            return res.status(500).json({
                message:"Incorrect Password"
            });
        }
        //if match then create the token
        const token = newToken(user);
        return res.status(200).send({token:token, user:user});

    } catch (error) {
        return res.status(500).send({error:error.message}); 
    }
}

module.exports = {register, login};