var routers = require('express').Router();
var contentDB = require('../dao/model.js');
var UserMdel  = require('../todo/user');

var fs = require('fs');

//商业逻辑
routers.get('/',function(req,res, next){
    res.redirect('/sharemoney/index.html');
});
function login(req, res, next) {
    var userphone = req.body.userphone;
    var password = req.body.password;
    UserMdel.getuser({phone:userphone}).then(
        function (data) {
            if(data){
                if(data.password == password){
                    res.send(data)
                }else {
                    res.send(201,"密码错误");
                }
            }else {
                res.send(201,"用户名不存在");
            }
        }
   /*     (data)=>{
        if(data){
            if(data.password == password){
                res.send(data)
            }else {
                res.send(201,"密码错误");
            }
        }else {
            res.send(201,"用户名不存在");
        }

    }*/)
}
//login
routers.post('/login', function(req, res, next) {
    login(req,res,next)
});

//注册
routers.post('/register', function(req, res, next){
    var user = {}
    user.phone = req.body.registephone;
    user.password = req.body.password;
    user.name = user.phone
    if(!(user.phone && user.phone.length == 11)){
        res.send(201,"用户名不合法");
        return
    }
    UserMdel.getuser({phone:user.phone}).then(
        function (data) {
            if(data){
                res.send(201,"用户名存在");
            }else {
                UserMdel.saveuser(user).then(
                    function () {
                        (data)=>{
                            if(data){
                                res.send(200,"注册成功")
                            }else{
                                res.send(201,"")
                            }
                    }

                })
            }
        }
        


        /*(data)=>{
        console.log(data)
        if(data){
            res.send(201,"用户名存在");
        }else {
            UserMdel.saveuser(user).then((data)=>{
                if(data){
                    res.send(200,"注册成功")
                }else{
                    res.send(201,"")
                }
            })
        }

    }*/)

});

module.exports = routers;







