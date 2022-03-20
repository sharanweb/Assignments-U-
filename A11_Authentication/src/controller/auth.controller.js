const User = require("../model/user.model");
const {body,validationResult} = require("express-validator");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const newToken = (user)=>{
    return jwt.sign({user:user}.process.env.JWT_ACCESS_KEY);
};

const register = async(req,res)=>{
    try {
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }

        //if user already exists
        let user = await User.findOne({email:req.body.mail}).lean().exec();

        if(user){
            return res.status(400).json({
                message:"Email already Exists try different"
            });
        }

        //if not then create
        user = await User.create(req.body);

        //create token
        const token = newToken(user);

        //return both user and the token
        return res.status(200).send({token:token, user:user});
    } catch (error) {
        return res.status(500).send({error:error.message});
    }
}

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