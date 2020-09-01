const connection = require('../db/index');
const express = require("express");
const router = express.Router();
const app = express();
const bodyParser = require("body-parser");

//使用body-parser中间件
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

//获取用户組列表
router.get('/getAuthlist', (req, res) => {
    
    sql = 'SELECT * FROM auth';

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

//获取用户组详情
router.get('/getAuth/:id', (req, res) => {
    
    sql = req.params.id ? 'SELECT * FROM auth where id = ' + req.params.id : 'SELECT * FROM auth'

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

//增加用户组
router.post('/addAuth', (req, res) => {
     let isSame = 'SELECT * FROM auth where title = "' + req.body.title + '"';
     connection.query(isSame, (err, re)=>{
         if (re.length !== 0) {
            res.status(200);
            res.json("添加失败，用户名重复");
            return;
         }

         var  addSql = 'INSERT INTO auth(title,rules) VALUES(?,?)';
         
         var  addSqlParams = [req.body.title, req.body.rules];;
       
         //执行sql添加用户
         connection.query(addSql,addSqlParams, (err, result) => {
               res.set("Access-Control-Allow-Origin", "*");
                 if(err){
                 console.log('[INSERT ERROR] - ',err.message);
                 return res.status(404).json('添加失败');;
                 }
                 
                 res.status(200);
                 res.json("添加成功");
         });

     })

  } ) 
 
//删除用户组
router.get("/deleteAuth/:id", (req, res) => {
    var delSql = 'DELETE FROM auth where id=' + req.params.id;
    //删
    connection.query(delSql,function (err, result) {
            if(err){
              console.log('[DELETE ERROR] - ',err.message);
              return res.status(404).json('删除失败');
            }        
            res.set("Access-Control-Allow-Origin", "*");
            res.status(200);
          res.json('删除成功');
    });
    
  })

//编辑用户组信息
router.post("/editUser", (req, res) => {
    sql = 'SELECT * FROM auth where id = ' + req.body.id 

    //查询
    connection.query(sql, (err, re) => {
            if(err){
              console.log('[SELECT ERROR] - ',err.message);
              return  res.status(404).json('没有任何内容');
            }
            console.log(re[0])
            var modSql = 'UPDATE auth SET title = ? , rules = ? WHERE id = ?';
            var modSqlParams = [];

            modSqlParams[0] = req.body.title || re[0].title;
            modSqlParams[1] = req.body.rules || re[0].rules;
            modSqlParams[2] = (req.body.id);
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

  })
  

  module.exports = router;