const express = require('express');
const app = express();
// console.log(app);
app.get("/books", book1mid,(req,res)=>{
    res.send("all books will be shown");
    // console.log("hello");
});
app.get("/book/:name",logger,(req,res)=>{
    res.send({BOOKNAME: req.name});
});


function book1mid(req, res, next){
    console.log("fetching all books");
    next();
    console.log("fetching complete");
}
function logger(req,res,next){
    req.name = req.params.name;
    next();
}


app.listen(5000,()=>{
    console.log("listening on port 5000");
});