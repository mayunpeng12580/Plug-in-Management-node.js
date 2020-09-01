const connection = require('../db/index');
const express = require("express");
const router = express.Router();
const app = express();
const bodyParser = require("body-parser");

//使用body-parser中间件
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

//获取路由列表
router.get('/getRoutelist', (req, res) => {
    
    sql = 'SELECT * FROM rule';

    //查询
    connection.query(sql, (err, result) => {
            if(err){
              console.log('[SELECT ERROR] - ',err.message);
              return  res.status(404).json('没有任何内容');
            }
            res.status(200);
            res.json(result);

    });

} ) 

//获取路由详情
router.get('/getRoute/:id', (req, res) => {
    
    sql = 'SELECT * FROM rule where id = ' + req.params.id 

    //查询
    connection.query(sql, (err, result) => {
            if(err){
              console.log('[SELECT ERROR] - ',err.message);
              return  res.status(404).json('没有任何内容');
            }
            res.status(200);
            res.json(result);

    });

} ) 

//增加路由
router.post('/addRoute', (req, res) => {
     let isSame = 'SELECT * FROM rule where title = "' + req.body.title + '"';
     connection.query(isSame, (err, re)=>{
         if (re.length !== 0) {
            res.status(200);
            res.json("添加失败，用户名重复");
            return;
         }

         var  addSql = 'INSERT INTO rule(title,pid,icon,path,o,type) VALUES(?,?,?,?,?,?)';
         
         var  addSqlParams = [req.body.title, req.body.pid - 0, req.body.icon, req.body.path, req.body.o, req.body.type];;
       
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
 
//删除路由
router.get("/deleteRoute/:id", (req, res) => {
    var delSql = 'DELETE FROM rule where id=' + req.params.id;
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

//编辑路由信息
router.post("/editRoute", (req, res) => {
    sql = 'SELECT * FROM rule where id = ' + req.body.id 

    //查询
    connection.query(sql, (err, re) => {
            if(err){
              console.log('[SELECT ERROR] - ',err.message);
              return  res.status(404).json('没有任何内容');
            }
            console.log(re[0])
            var modSql = 'UPDATE rule SET title = ? , pid = ? , icon = ? , path = ? , o = ? , type = ? WHERE id = ?';
            var modSqlParams = [];

            modSqlParams[0] = req.body.title || re[0].title;
            modSqlParams[1] = req.body.pid || re[0].pid;
            modSqlParams[2] = req.body.icon || re[0].icon;
            modSqlParams[3] = req.body.path || re[0].path;
            modSqlParams[4] = req.body.o || re[0].o;
            modSqlParams[5] = req.body.type || re[0].type;
            modSqlParams[6] = (req.body.id);
            console.log(modSqlParams)
            connection.query(modSql,modSqlParams,function (err, result) {
              if(err){
                      return res.status(404).json('修改失败');;;
              }        
              
              res.status(200);
              let data = {};
              data.data = modSqlParams;
              data.message = '修改成功！！！';
              
              res.send(data);
            });

    });

  })
  

  module.exports = router;