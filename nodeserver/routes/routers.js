var routers = require('express').Router();
var usersDB = require('../dao/users.json');
var contentDB = require('../dao/model.js');

var fs = require('fs');

console.log(usersDB.users);

function renderUserPage(req, res, next){

    //if(中国){
    //  显示汉字
    //}
    //if(usa){
    //  显示英语
    //}
    //var useName = req.body.userName;
    //var user = getUser(useName);    //数据库访问
    var country = req.userInfo.country;
    var obj = null;
    if('china' === country){
        obj = contentDB.getChinese();
    }else if('usa' === country){
        obj = contentDB.getEnglish();
    }else {
        obj = contentDB.getChinese();
    }
    //console.log(obj);
    res.render('index.ejs', obj);
}

function getUser(userName){
    //去数据库看看有没有这个名字
    //遍历数组
    //if(匹配到了){
    //    返回 user 的对象
    //}
    //if(没匹配到)
    //{
    //  返回一个 null
    // }
    var result = null; //初始化
    console.log('-------------------');
    console.log(usersDB.users);
    for(var i=0; i<usersDB.users.length; i++){
        var user = usersDB.users[i];
        if(user.name == userName){
            result = user;
            break;
        }
    }
    return result;
}

function saveUser(userObj, callback){
    usersDB.users.push(userObj);
    var path = '../dao/users.json';
    var jsonStr = JSON.stringify(usersDB);
    fs.writeFile(path, jsonStr, function(err){
        if(err){
            console.error(err);
            callback(err);
        }else {
            //正常工作
            callback(null);
        }
    });

    //var obj = JSON.parse('{"name":"valeu"}');
    //console.log('--------------------------')
    //console.log(usersDB);
    //console.log(jsonStr);
}

//商业逻辑
routers.get('/',function(req,res, next){
    //res.send(' 首页');
    //var obj = {
    //    firstTitle:'html',
    //    firstP : 'html 是一种非常好的语言',
    //    firstContent: '确实非常好',
    //    secondTitle:'css',
    //    secondP : 'css 是一种非常好的语言',
    //    secondContent: '确实非常好'
    //};
    res.redirect('/sharemoney/index.html');
});

//login
routers.get('/login', function(req, res, next){
    //
    //var name = req.query.name;
    //console.log(name);
    res.redirect('/login.html');// 重定向
});
routers.post('/login', function(req, res, next) {
    var userName = req.body.userName;
    var password = req.body.password;
    //console.log(userName);

    // 用户名是否存在
    // 密码是否正确
    // if( 用户名存在 )
    //{
    //    if(密码正确){
    //        把个人的页面画出来
    //    }
    //    else{
    //        密码错误 ： 用户名或者密码错误
    //    }
    //}
    //else{
    //    用户名不存在 ： 用户名或者密码错误
    //}
    var user = getUser(userName);   //获取过数据库
    if( user ){
        if(password == user.password){
            //console.log('页面');
            //res.send('页面');
            req.userInfo = user;
            renderUserPage(req, res, next);
        }else {
            //console.log('密码错误');
            res.send('密码错误');
        }
    } else {
            //console.log('用户名不存在');
        res.send('用户名不存在');
    }
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







