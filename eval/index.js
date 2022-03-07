const express = require('express');
const app = express();

app.use(logger);  //logger for all functions

app.get("/books", (req,res)=>{
    res.send("books");
})

app.get("/libraries",checkPermission("/libraries"), (req,res)=>{
    console.log("libraries");
    res.send("libraries");
})

app.get("/authors", checkPermission("authors"), (req,res)=>{
    res.send("authors");
})

//middlewares for authors and libraries
function checkPermission(something){
    return function (req,res,next){
        if(something==="/libraries"){
            
        }
    }
}


function logger(req,res,next){
    console.log("fetching before");
    next();
    console.log("function done bye");
}

app.listen(5001,()=>{
    console.log("Listeninig on port 5001");
})