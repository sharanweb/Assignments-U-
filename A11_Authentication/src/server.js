const app = require("./index");
const connect = require("./config/db")

app.listen(5005, async()=>{
    try {
       await connect(); 
    } catch (error) {
        console.log(error.message);
    }
    console.log("listening port autho 5005");
});