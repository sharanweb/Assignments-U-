const express = require("express");
const mongoose =  require("mongoose");
const app = express();

//connect mongo database
const connect = ()=>{
    return mongoose.connect("mongodb://127.0.0.1:27017/bankdata");
}

app.listen(5700, async()=>{
    try {
        await connect();
    } catch (error) {
        console.log(error);
    }
    console.log("listeninig on port 5700");
});

//------------------User Schema-------------------//
const userSchema = new mongoose.Schema(
    {
        firstName:{type:String, required:true},
        middleName:{type:String},
        lastName:{type:String,required:true},
        age:{type:Number, required:true},
        email:{type:String, required:true},
        address:{type:String, required:true},
        gender:{type:String, default:"Female"},
        type:{type:String, default: "customer"},
    },
    {
        versionKey:false,
        timestamps:true
    }
)
const User = mongoose.model("user",userSchema);
//-------------BranchDetail Schema-----------------//
const branchdetailSchema = mongoose.Schema(
    {
        name:{type:String, required:true},
        address:{type:String, required:true},
        IFSC:{type:String, required:true},
        MICR:{type:Number, required:true},
    },
    {
        versionKey:false,
        timestamps:true
    }
)
const Branchdetail = mongoose.model("branchdetail",branchdetailSchema);

//--------------------Master Account Schema---------------------//
const masteraccountSchema = mongoose.Schema(
    {
        balance:{type:Number, required:true},
        masteruser_id:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"user",
            required:true
        },
        manager_id:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"user",
            required:true
        },
        branchdetail_id:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"branchdetail",
            required:true
        }
    },
    {
        versionKey:false,
        timestamps:true
    }
)
const Masteraccountdetail = mongoose.model("masteraccountdetail",masteraccountSchema);

//------------------Savings Account------------------//
const savingsaccountSchema = mongoose.Schema(
    {
        account_number:{type:Number, required:true},
        balance:{type:Number, required:true},
        interestRate:{type:Number, required:true},
        savingsuser_id:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"user",
            required:true
        },
        branchdetail_id:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"branchdetail",
            required:true
        },
        master_id:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"masteraccountdetail",
            required:true
        }
    },
    {
        versionKey:false,
        timestamps:true
    }
)
const Savingsaccount = mongoose.model("savingsaccountdetail",savingsaccountSchema);

//-------------------FIxed Account Schema--------------//
const fixedaccountSchema = mongoose.Schema(
    {
        account_number:{type:Number, required:true},
        balance:{type:Number, required:true},
        interestRate:{type:Number, required:true},
        startdate:{type:String, required:true},
        maturitydate:{type:String, required:true},
        fixeduser_id:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"user",
            required:true
        },
        branchdetail_id:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"branchdetail",
            required:true
        },
        master_id:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"masteraccountdetail",
            required:true
        }
    },
    {
        versionKey:false,
        timestamps:true
    }
)
const Fixedaccountnumber = mongoose.model("fixedaccountnumber",fixedaccountSchema);




//---------------CRUD------------------------//
//post user details
app.post("/users",async(req,res)=>{
    try {
        const user = await User.create(req.body);
        return res.status(200).send({holder: user});
    } catch (error) {
        return res.status(500).send(error.message);
    }
});


//_____________________CRUD________________________//
//1 - GET API to get all the details of the master account ( here you will get the complete detail of the
    // master account collection along with the full user detail )

app.get("/masteraccount", async(req,res)=>{
    try {
        const master = await Masteraccountdetail.find()
        .populate("user") //will show th entire details of the users inside master
        .lean()
        .exec();
        return res.status(200).send({masterholder: master});
    } catch (error) {
        return res.status(500).send(error.message);
    }
});


//2 - POST API for the user to create a SavingsAccount
app.post("/savingsaccount",async(req,res)=>{
    try {
        const saving = await Savingsaccount.create(req.body);
        return res.status(200).send({savingsholder: saving});
    } catch (error) {
        return res.status(500).send(error.message);
    }
});

//3 - POST API for the user to create a FixedAccount
app.post("/fixedaccount",async(req,res)=>{
    try {
        const fixed = await Fixedaccountnumber.create(req.body);
        return res.status(200).send({fixed: fixed});
    } catch (error) {
        return res.status(500).send(error.message);
    }
});

//4 - GET API that takes the master account id and returns a list of 
    //all the accounts that the user has but only the account_number and balance
    app.get("/masteraccount/:id", async(req,res)=>{
        try {
            const master = await Masteraccountdetail.find(req.params.id).lean().exec();
            return res.status(200).send({masterholder: master});
        } catch (error) {
            return res.status(500).send(error.message);
        }
    });

