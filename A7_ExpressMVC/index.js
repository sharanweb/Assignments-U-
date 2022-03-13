const express = require("express");
const mongoose = require("mongoose");
const app = express();


//connect mongo database
const connect = ()=>{
    return mongoose.connect("mongodb://127.0.0.1:27017/masaiEval");
}
app.use(express.json());

app.listen(5600, async()=>{
    try {
        await connect();
    } catch (error) {
        console.log("error");
    }
    console.log("listening on port 5600");
});

//--------------Users Schema--------------//
const userSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    gender: { type: String, required: false, default: "Male" },
    date_of_birth: { type: String, required: true },
    type: {type:String, required:true}
}, {
    versionKey: false,
    timestamps: true,
});

const User = mongoose.model("user",userSchema);

//--------------Students Schema------------//
const studentSchema = new mongoose.Schema({
    roll_id: { type: Number, required: true },
    current_batch: { type: String, required: true },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    evaluation_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "evaluation",
        required: true,
    }
}, {
    versionKey: false,
    timestamps: true,
});
const Student = mongoose.model("student",studentSchema);

//---------------Evaluation Schema---------------//
const evaluationSchema = new mongoose.Schema(
    {
      date_of_evaluation: { type: "String", required: true },
      instructor_details: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
      },
      batch_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "batch",
        required: true,
      },
    },
    {
      versionKey: false,
      timestamps: true,
    }
);
const Evaluation = mongoose.model("evaluation",evaluationSchema);

//----------------Batch Schema-----------------------//
const batchSchema = mongoose.Schema(
    {
      batch_name: { type: "String", required: true },
    },
    {
      versionKey: false,
      timestamps: true,
    }
);
const Batch = mongoose.model("batch",batchSchema);

//-----------------Submission Schema-----------------//
const submissionSchema = mongoose.Schema(
    {
        evaluation_id : {
            type: mongoose.Schema.Types.ObjectId,
            ref: "evaluation",
            required: true,
        },
        
        student_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "student",
            required: true,
        },
        marks:{type:Number, required:true},
    },
    {
        versionKey: false,
        timestamps: true,  
    }
);
const Submission = mongoose.model("submission",submissionSchema);
//-------------Users CRUD--------------------//
//uc - 1  : getting the data from server
app.get("/users", async(req,res) =>{
    try {
        const users = await User.find().lean().exec();
        return res.status(200).send({users:users});
    } catch (error) {
        console.log(error);
        return res.status(500).send("Please Try After Some Time");
    }
});

//uc - 2  : posting the data on the server
app.post("/users", async(req,res)=>{
    try {
        const users = await User.create(req.body);
        return res.status(201).send(users);
    } catch (error) {
        console.log(error);
        return res.status(500).send({error: error});
    }
});

//_______________Student Crud_______________//
//sc - 1  : getting the data from server
app.get("/students", async(req,res) =>{
    try {
        const students = await Student.find()
          .populate({path:"user_id", select:{first_name:1, last_name:1,}})
          .populate({path:"evaluation_id",select:["dat_of_evaluation"],
             populate:[
                 {path:"instructor_details",select:["first_name","last_name"]},
                 {path:"batch_id",select:["batch_name"]}
                ]
            })
          .lean()
          .exec();
        return res.status(200).send({students:students});
    } catch (error) {
        console.log(error);
        return res.status(500).send("Please Try After Some Time");
    }
});

//sc - 2  : posting the data on the server
app.post("/students", async(req,res)=>{
    try {
        const students = await Student.create(req.body);
        return res.status(201).send(students);
    } catch (error) {
        console.log(error);
        return res.status(500).send({error: error});
    }
});

//____________Batch CRUD____________________//
//bc - 1  : getting the data from server
app.get("/batches", async(req,res) =>{
    try {
        const batches = await Batch.find().lean().exec();
        return res.status(200).send({batches:batches});
    } catch (error) {
        console.log(error);
        return res.status(500).send("Please Try After Some Time");
    }
});

//bc - 2  : posting the data on the server
app.post("/batches", async(req,res)=>{
    try {
        const batches = await Batch.create(req.body);
        return res.status(201).send(batches);
    } catch (error) {
        console.log(error);
        return res.status(500).send({error: error});
    }
});

//_____________________Evaluation CRUD__________________//
//ec - 1  : getting the data from server
app.get("/evaluations", async(req,res) =>{
    try {
        const evaluations = await Evaluation.find().populate("instructor_details").populate("batch_id").lean().exec();
        return res.status(200).send({evaluations:evaluations});
    } catch (error) {
        console.log(error);
        return res.status(500).send("Please Try After Some Time");
    }
});

//ec - 2  : posting the data on the server
app.post("/evaluations", async(req,res)=>{
    try {
        const evaluations = await Evaluation.create(req.body);
        return res.status(201).send(evaluations);
    } catch (error) {
        console.log(error);
        return res.status(500).send({error: error});
    }
});


//_____________________Submissions CRUD__________________//
//suc - 1  : getting the data from server
app.get("/submissions", async(req,res) =>{
    try {
        const submissions = await Submission.find()
          .populate({path:"student_id",select:["roll_id","current_batch"],
              populate:[
                  {path:"user_id",select:["first_name","last_name"]},
                  {path:"evaluation_id", select:["date_of_evaluation"],
                    populate:{path:"instructor_details",select:["first_name","last_name"]}
                  }
                ]
           })
          .lean()
          .exec();
        return res.status(200).send({submissions:submissions});
    } catch (error) {
        console.log(error);
        return res.status(500).send("Please Try After Some Time");
    }
});

//suc - 2  : posting the data on the server
app.post("/submissions", async(req,res)=>{
    try {
        const submissions = await Submission.create(req.body);
        return res.status(201).send(submissions);
    } catch (error) {
        console.log(error);
        return res.status(500).send({error: error});
    }
});


//==========LETS START OPERATIONS====================//

//op - 1:  fetch all students who gave a particular evaluation

app.get("/:id/students", async (req, res) => {
    try {
        const evaluation = await Evaluation.findById(req.params.id).lean().exec();
        const students = await Student.find({evaluation_id: evaluation._id}).populate({path: "user_id", select: ["first_name", "last_name"]}).lean().exec();

        return res.status(201).send(students);

    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
});

//op - 2: fetch the student with his personal details who scored the highest marks in the evaluation
app.get("/topper", async (req, res) => {
    try {
        const student = await Submission.find()
          .sort({marks: -1})
          .limit(1)
          .populate({path:"student_id",select:[],
             populate:{path:"user_id", select:["first_name","last_name"]}
           })
          .lean()
          .exec();

        return res.status(201).send(student);

    } catch (error) {
        return res.status(500).send({ message: error.message});
    }
})

   
