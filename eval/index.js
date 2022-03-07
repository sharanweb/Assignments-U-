const express = require('express');
const app = express();

app.use = logger;  //logger for all functions

app.get("/books", (req,res)=>{
    res.send({route: req.path});
})

app.get("/libraries",checkPermission("/libraries"), (req,res)=>{
    console.log("libraries");
    res.send({route: req.path});
})

app.get("/authors", checkPermission("authors"), (req,res)=>{
    res.send({route: req.path});
})

//middlewares for authors and libraries
function checkPermission(something){
    return function (req,res,next){
        if(something==="/libraries" || something === "/authors"){
            permission = true;
            next();
        }else{
            permission = false;
            next();

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