/**
 * Created by Administrator on 2017/7/20.
 */
var mongoose = require("mongoose")
mongoose.connect("mongodb://localhost:10001/test");
var db = mongoose.connection
db.on("error",function (err) {
    console.log(err)
})
db.on("open",function () {
    console.log("opend")
})
var usrmodel = new mongoose.Schema({
    name:{type:String,default:""},
    age:{type:Number,default:0},
    phone:{type:Number},
    password:{type:Number},
    headpic:{type:String,default:""},
    motto:{type:String,default:""}
})
var users= mongoose.model("user",usrmodel)
var usr = {
    phone:18613805780,
    password:"21153316"
}
new users(usr).save(function (err,doc) {
    if(err){

    }else {
        console.log(doc)
    }
})
db.on("close",function () {
    console.log("close")
})