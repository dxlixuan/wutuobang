/**
 * Created by Administrator on 2017/8/7.
 */
var mongoose = require("mongoose")
mongoose.connect("mongodb://localhost:10001/wutuobang");
var db = mongoose.connection
db.on("error",function (err) {
    console.log(err)
})
db.on("open",function () {
    console.log("opend")
})
module.exports = mongoose;