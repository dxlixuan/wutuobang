var routers = require('express').Router();
var contentDB = require('../dao/model.js');
var user  = require('../todo/user');

var fs = require('fs');
function backall(data,status,message) {
    if(!message){
        message = "";
    }
    if(!data){
        data = [];
    }
    if(!status){
        status = 0;
    }
    return {status:status,data:data,message:message};
}
//商业逻辑
routers.get('/',function(req,res, next){
    res.redirect('/sharemoney/index.html');
});

//login
routers.psot('/login', function(req, res, next) {
    var userphone = req.body.userphone;
    var password = req.body.password;
    user.getuser(user).then((data)=>{
        if(data){
            if(data.password == password){
                res.send(backall(data))
            }else {
                res.send(backall(null,1,"密码错误"));
            }
        }else {
            res.send(backall(null,1,"用户名不存在"));
        }

    })
});

//注册
routers.get('/register', function(req, res, next){
    res.redirect('/register.html');// 重定向
});
routers.post('/register', function(req, res, next){
    var userName = req.body.userName;
    var password = req.body.password;
    var country = req.body.country;

    //注册的逻辑
    //先看看数据库有没有这个名字
    //if（有）{
    //    返回已经存在
    //}else{
    //    注册
    //    返回页面
    //}
    var user = getUser(userName);
    if(user){
        res.send('用户已经存在');
    }else{
        //注册    写入数据库
        var userObj = {
            name : userName,
            password : password,
            country  : country
        };
        //异步 数据库操作
        saveUser(userObj, function(err){
            if(err){
                res.send(err);
            }else {
                //res.send('你的首页');
                //res.redirect('/login.html');  //注册之后 去登录
                req.userInfo = userObj;
                renderUserPage(req, res, next);
            }
        });
    }
});


module.exports = routers;



//构造函数
function Yaoguai( name, age ){

}
var yao = new Yaoguai();







