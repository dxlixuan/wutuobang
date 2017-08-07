/**
 * Created by Administrator on 2017/8/7.
 */
var mongoose = require('../dao/startmongo');
var usrmodel = new mongoose.Schema({
    name:{type:String,default:""},
    age:{type:Number,default:0},
    phone:{type:Number},
    password:{type:Number},
    headpic:{type:String,default:""},//头像
    motto:{type:String,default:""},//擅长
    createtime: {type:String,default:""},//创建时间
    mtime : {type:String,default:""},//修改时间
})
var users= mongoose.model("user",usrmodel)
var user = {phone:18613805780}
function getuser(user) {
    return users.findOne(user)
}
exports.getuser = getuser;