/**
 * 服务器代码
 * 启动服务器命令 nodemon 启动  需要安装包nodemon 我们这里下载了nodemon 可使用nodemon启动服务，也可以使用node直接启动
 * npm i nodemon -g
 * nodemon server.js
 * 
 * node启动不需要安装包只需要安装node就可以
 * node server.js
 * 
*/

// 通过node的  express 快速搭建一个服务  
const express =require('express');
// 通过node 的 express构建一个服务对象
const app = express();
// 给构建对象指定启动目录位置 dist 和邮箱时间1小时
app.use(express.static('dist',{ maxAge : 1000 * 3600}));
// 指定端口
app.listen(3000);

// 启动服务后使用http://localhost:3000 就能访问服务地址
