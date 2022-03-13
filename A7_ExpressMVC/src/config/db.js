const mongoose = require("mongoose");

//connect mongo database
const connect = ()=>{
    return mongoose.connect("mongodb://127.0.0.1:27017/masaiEval");
}

module.exports = connect;