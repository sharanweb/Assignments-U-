const express = require("express");
const {body, validationResult} = require("express-validator");
const User = require("../modules/user.schema");
const router = express.Router();

router.post("/",
        body("first_name").isLength({min:3, max:22}).withMessage("use min-3 and max-22 characterstics"),

        body("last_name").notEmpty().withMessage("last name required"),

        body("email").custom(async(value)=>{
            const isEmail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(value);
            if(!isEmail){
                throw new Error("Invalid Email Address");
            }
            //check same email email is present
            const isSameEmail = await User.findOne({email:value}).lean().exec();
            if(isSameEmail !== null){
                throw new Error("Email Already Exists");
            }
            return true;
        }),

        body("pincode").isLength({min:6,max:6}).withMessage("Pincode can not be less than 6 digits").custom((value)=>{
            const isNum = /^[0-9]*$/.test(value);
            if(!isNum){
                throw new Error("Enter only Numbers 0-9");
            }
            return true;
        }),

        body("age").isLength({min:1,max:3}).withMessage("No man has lived beyond 135 years").custom((value)=>{
            if(value<1 || value >100){
                throw new Error("Age should between 1 to 100");
            }
            return true;
        }),

        body("gender").notEmpty().withMessage("Enter gender").custom((value)=>{
            if(value == "Male" || value == "Female" || value == "Others"){
                return true;
            }
            throw new Error("Enter valid gender");
        }),

        async(req, res)=>{
            //validation copt paste
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                let newErrors = errors.array().map(({ msg, param  }) => {
                    return {
                        [param]: msg,
                    }
                });
              return res.status(400).json({ errors: newErrors });
            }
            try {
                const users = await User.create(req.body);
                return res.status(201).send(users);
            } catch (error) {
                return res.status(500).send({error:error.message});
            }

        }
)

module.exports = router;