const server = require('express');
const app = server();
const bodyParser = require("body-parser");

//使用body-parser中间件
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));


//引入user.js
const user = require("./router/user");
app.use("/api/user", user);


app.listen('9000', ()=> {
    
    console.log(`server running ...`);
})