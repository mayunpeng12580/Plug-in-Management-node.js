const connection = require('../db/index');
const express = require("express");
const router = express.Router();
const app = express();
const bodyParser = require("body-parser");

//使用body-parser中间件
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));


//登录
router.post('/login', (req, res) => {
      let isSame = 'SELECT * FROM user where name = "' + req.body.name + '" and password = "' + req.body.password + '"';
      connection.query(isSame, (err, re)=>{
        if(err){
          return res.status(404).json('用户名或密码错误！！！');;
          }
          
         if (re.length == 0) {
            res.status(200);
            res.json("用户名或密码错误！！！");
            return;
         }

          res.status(200);
          let data = {
             data: [],
             message: "登录成功"
          }
          res.json(data);

     })

  } ) 
 
  module.exports = router;