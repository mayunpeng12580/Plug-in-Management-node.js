const mysql = require('mysql');

const connection = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'',
  database:'plugin'
})

//连接数据库
connection.connect();


module.exports = connection;