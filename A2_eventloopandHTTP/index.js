const express  = require("express");
const app = express();

app.get("/",function(req,res){
    res.send("hello");
});

app.get("/books",function(req,res){
    res.send([
        {
            author: "abdulkalam",
            book: "wings of fire"
        },
        {
            author: "gopalgodse",
            book:"why i assasinated mkgandhi",
        },
        {
            author: "paramhamsa yogananda",
            book: "autobiography of yogi",
        },
        {
            author: "nandan nilekani",
            book: "discovering India",
        }
    ])
})

app.listen(4000,() => {
    console.log("Listening on port 4000");
});