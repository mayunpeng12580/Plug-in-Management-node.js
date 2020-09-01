const server = require('express');
const app = server();
const bodyParser = require("body-parser");

//使用body-parser中间件
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.all('*', function(req, res, next) {
    //设为指定的域
    res.header('Access-Control-Allow-Origin', "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header('Access-Control-Allow-Credentials', true);
    res.header("X-Powered-By", ' 3.2.1');
    next();
  });



//引入user.js
const user = require("./router/user");
app.use("/api/user", user);

//引入login.js
const login = require("./router/login");
app.use("/api/login", login);

//引入route.js
const route = require("./router/route");
app.use("/api/route",route);

//引入auth.js
const auth = require("./router/auth");
app.use("/api/auth",auth);

app.listen('9000', ()=> {
    
    console.log(`server running ...`);
})