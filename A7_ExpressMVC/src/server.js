const app = require("./index.js");
const connect = require("./config/db");

app.listen(5600, async()=>{
    try {
        await connect();
    } catch (error) {
        console.log("error");
    }
    console.log("listening on port 5600");
});