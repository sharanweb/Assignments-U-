const express = require("express");
const mongoose = require("mongoose");
const app = express();

//connect mongo database
const connect = ()=>{
    return mongoose.connect("mongodb://127.0.0.1:27017/libdata");
}
app.use(express.json());

app.listen(5500, async()=>{
    try {
        await connect();
    } catch (error) {
        console.log("error");
    }
    console.log("listening on port 5500");
})

//-------------SECTION SCHEMA----------------//
const sectionSchema = new mongoose.Schema(
    {
        sectionName: {type:String, required:true}
    }
);
const Section = mongoose.model("section",sectionSchema);


//--------------AUTHOR SCHEMA-------------//
const authorschema = new mongoose.Schema(
    {
        first_name:{type:String, required:true},
        last_name:{type:String, required:true}
    }
);
const Author = mongoose.model("author",authorschema);


//-------------BOOK SCHEMA---------------//
const bookSchema = new mongoose.Schema(
    {
        book_title:{type:String, required:true},
        book_body:{type:String, required:true},
        checkOut : { type: Boolean, require: true },
        section_Id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "section",
            required: true
        },
        author_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "author",
            required: true
        }
    }
);
const Book = mongoose.model("book",bookSchema);
//_______section CRUD_________________//
//sc - 1  : getting the data from server
app.get("/sections", async(req,res) =>{
    try {
        const sections = await Section.find().lean().exec();
        return res.status(200).send({section:sections});
    } catch (error) {
        console.log(error);
        return res.status(500).send("Please Try After Some Time");
    }
});

//sc - 2  : posting the data on the server
app.post("/sections", async(req,res)=>{
    try {
        const section = await Section.create(req.body);
        return res.status(201).send(section);
    } catch (error) {
        console.log(error);
        return res.status(500).send({error: error});
    }
})


//______________AUthor CRUd_______________//
//ac - 1  : getting the data from the server
app.get("/authors",async (req,res) =>{
    try {
        const author = await Author.find().lean().exec();
        return res.status(200).send({author: author});
    } catch (error) {
        console.log(error);
        return res.status(500).send("Please try ater some time");
    }
});

//ac - 2:  posting the data to the server
app.post("/authors", async(req,res)=>{
    try {
        const author = await Author.create(req.body);
        return res.status(201).send(author);
    } catch (error) {
        return res.status(500).send(error);
    }
});

//____________Books CRUD__________________//
//bc - 1: getting the data from the server
app.get("/books", async(req,res)=>{
    try {
        const book = await Book.find()
             .populate("section_Id")
             .populate("author_id")
             .lean().exec();
        return res.status(200).send({book:book});
    } catch (error) {
        console.log(error);
        return res.status(500).send("plase tyr after  some time");
    }
});

//bc - 1: posting the data to the server
app.post("/books",async(req,res)=>{
    try {
        const book = await Book.create(req.body);
        return res.status(201).send({book:book})

    } catch (error) {
        return res.status(500).send({error:error});
    }
});

//______________start doing operations___________//
//op - 1 : find all the books written by the author
app.get("/:author_ID/books", async(req,res)=>{
    try {
        const booksbya = await Book.find({author_id: req.params.author_ID}).lean().exec();
        return res.status(200).send({books: booksbya});
    } catch (error) {
        return res.status(500).send({error: error});
    }
});

//op - 2  : getting the books in the particulat section
app.get("/books/:section_ID", async(req,res)=>{
    try {
        const book  = await Book.find({section_Id: req.params.section_ID}).lean().exec();
        return res.status(200).send({books: book});

    } catch (error) {
        return res.status(500).send({error: error});
    }
})

//op - 3  : find books of 1 author inside a section Optional
app.get("/:section_Id/books/:author_ID",async(req,res)=>{
    try {
        const bookbyone = await Book.find({$and:[{section_Id: req.params.section_ID},{author_id: req.params.author_ID}]}).lean().exec();
        return res.status(200).send({books: bookbyone});   
    } catch (error) {
        return res.status(500).send({error: error});
    }
})

//op - 4 : find books in a section that are not checked out
app.get("/book/notcheckout", async function(req, res){
    try {
        const datanot = await Book.find({"checkOut":{$eq: false}}).lean()
        return res.status(200).send(datanot);
    } catch (error) {
        return res.status(500).send({error: error});
    }
    
});