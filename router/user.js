const connection = require('../db/index');
const express = require("express");
const router = express.Router();
const app = express();
const bodyParser = require("body-parser");

//使用body-parser中间件
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

//获取用户列表
router.get('/getUserlist', (req, res) => {
    
    // sql = 'SELECT * FROM user';
    sql = 'SELECT user.*, auth.title, auth.rules FROM user LEFT JOIN auth ON user.auth = auth.id';

    //查询
    connection.query(sql, (err, result) => {
            if(err){
              console.log('[SELECT ERROR] - ',err.message);
              return  res.status(404).json('没有任何内容');
            }
            res.set("Access-Control-Allow-Origin", "*");
            res.status(200);
            res.json(result);

    });

} ) 

//获取用户详情
router.get('/getUser/:id', (req, res) => {
    
    sql = 'SELECT * FROM view_user_auth where id = ' + req.params.id
    //查询
    connection.query(sql, (err, result) => {
            if(err){
              console.log('[SELECT ERROR] - ',err.message);
              return  res.status(404).json('没有任何内容');
            }
            res.set("Access-Control-Allow-Origin", "*");
            res.status(200);
            res.json(result);

    });
} ) 

//增加用户
router.post('/addUser', (req, res) => {
     let isSame = 'SELECT * FROM user where name = "' + req.body.name + '"';
     res.set("Access-Control-Allow-Origin", "*");
     connection.query(isSame, (err, re)=>{
        
         if (re.length !== 0) {
            res.status(200);
            res.json("添加失败，用户名重复");
            return;
         }

         var  addSql = 'INSERT INTO user(name,password,auth) VALUES(?,?,?)';
         
         var  addSqlParams = [req.body.name, req.body.password, req.body.auth || 2];;
       
         //执行sql添加用户
         connection.query(addSql,addSqlParams, (err, result) => {
               
                 if(err){
                 console.log('[INSERT ERROR] - ',err.message);
                 return res.status(404).json('添加失败');;
                 }
                 
                 res.status(200);
                 res.json("添加成功");
         });

     })

  } ) 
 
//删除用户
router.get("/deleteUser/:id", (req, res) => {
    var delSql = 'DELETE FROM user where id=' + req.params.id;
    //删
    connection.query(delSql,function (err, result) {
            if(err){
              console.log('[DELETE ERROR] - ',err.message);
              return res.status(404).json('删除失败');
            }        
            console.log(result)
            res.set("Access-Control-Allow-Origin", "*");
            res.status(200);
          res.json('删除成功');
    });
    
  })

//编辑用户信息
router.post("/editUser", (req, res) => {
    sql = 'SELECT * FROM user where id = ' + req.body.id 
    console.log(req.body)
    //查询
    connection.query(sql, (err, re) => {
            if(err){
              console.log('[SELECT ERROR] - ',err.message);
              return  res.status(404).json('没有任何内容');
            }
            var modSql = 'UPDATE user SET name = ? , password = ?, auth = ? WHERE id = ?';
            var modSqlParams = [];

            modSqlParams[0] = req.body.name || re[0].name;
            modSqlParams[1] = req.body.password || re[0].password;
            modSqlParams[2] = req.body.auth || re[0].auth;
            modSqlParams[3] = req.body.id;
            console.log(modSqlParams)
            connection.query(modSql,modSqlParams,function (err, result) {
            res.set("Access-Control-Allow-Origin", "*");
            if(err){
                    return res.status(404).json('修改失败');;;
            }        
            
            res.status(200);
            res.json(result);
            });

    });

    
    
    // connection.end();
   
  })
  

  module.exports = router;