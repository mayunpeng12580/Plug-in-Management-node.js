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
          res.json("登录成功");

     })

  } ) 
 
  module.exports = router;