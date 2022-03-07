const express = require('express');
const app = express();

app.use(logger);  //logger for all functions

//routehandler 1
app.get("/books", (req,res)=>{   
    res.send({route: req.path});
})
// showing like this on browser [{"route":"/books"}];


//routehandler 2 
app.get("/libraries",checkPermission("librarian"), (req,res)=>{  
    console.log("libraries");
    res.send({route: req.path , permission: req.permission});
})
//insted of route: "/libraries" used route: "req.path"
// showing like this on browser [{"route":"/libraries","permission":true}];


//routehandler 3
app.get("/authors", checkPermission("author"), (req,res)=>{
    res.send({route: req.path , permission: req.permission});
})
//insted of route: "/authors" used route: "req.path"
// showing like this on browser [{"route":"/authors","permission":true}];



//Common middleware for authors and libraries function 
function checkPermission(something){
    return function (req,res,next){
        if(req.path == '/libraries'){
            req.permission = true;
            
        }else if(req.path == '/authors'){
            req.permission = true;
        }
        next();
    }
}

//common logger function
function logger(req,res,next){
    console.log("fetching before");
    next();
    console.log("function done bye");
}

//listener here
app.listen(5001,()=>{
    console.log("Listeninig on port 5001");
})