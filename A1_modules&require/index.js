const add = require("./add");
const sub = require("./sub");
const mul = require("./mul");
const div = require("./div");


console.log(add(10,20));
console.log(sub(30,20));
console.log(mul(10,20));
console.log(div(20,20));


console.log(add(12,20) + sub(50,60) + mul(2,3) + div(50,5));


console.log(add(mul(2,3),div(50,5)));
