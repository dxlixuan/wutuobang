var goodTime = function(unixTime){
  let str = parseInt( unixTime )
  var now = new Date().getTime(),
    oldTime = new Date(str).getTime(),
    difference = now - oldTime,
    result='',
    minute = 1000 * 60,
    hour = minute * 60,
    day = hour * 24,
    halfamonth = day * 15,
    month = day * 30,
    year = month * 12,

    _year = difference/year,
    _month =difference/month,
    _week =difference/(7*day),
    _day =difference/day,
    _hour =difference/hour,
    _min =difference/minute;
  if(_year>=1) {result= ~~(_year) + " 年前"}
  else if(_month>=1) {result= ~~(_month) + " 个月前"}
  else if(_week>=1) {result= ~~(_week) + " 周前"}
  else if(_day>=1) {result= ~~(_day) +" 天前"}
  else if(_hour>=1) {result= ~~(_hour) +" 个小时前"}
  else if(_min>=1) {result= ~~(_min) +" 分钟前"}
  else result="刚刚";
  return result;
}

var date = function(unixTime){
  function add0(m) {
    return m < 10 ? '0' + m : m
  }
  var time = new Date(unixTime);
  var y = time.getFullYear();
  var m = time.getMonth() + 1;
  var d = time.getDate();
  return y + '-' + add0(m) + '-' + add0(d);
}
/*
Date.prototype.format = function(format){
  var o = {
    "M+" : this.getMonth()+1, //month
    "d+" : this.getDate(), //day
    "h+" : this.getHours(), //hour
    "m+" : this.getMinutes(), //minute
    "s+" : this.getSeconds(), //second
    "q+" : Math.floor((this.getMonth()+3)/3), //quarter
    "S" : this.getMilliseconds() //millisecond
  }
  if(/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
  }
  for(var k in o) {
    if(new RegExp("("+ k +")").test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));
    }
  }
  return format;
};
*/

var removeTag = function(html){
  return html.replace(/<\/?[^>]*>/g,'')
}

//var htmlFilter = function(str){
//  return str.replace(/<(img|script|a)[^>]+>/g,'');
//}


/*
 * object args 需传入一个对象
 * bool args.removeJS 是否去除script标签
 * bool args.removeCss 是否去除css标签
 * bool args.removeATags 是否去除a标签
 * bool args.removeAllTags 是否去除所有标签
 * bool args.replaceProductsName 是否替换同行域名和产品名
 */
var htmlFilter = function (args){
  if( !args ) return
  var s = args.str
  typeof args.removeJS === 'boolean' &&
    args.removeJS === true &&
    (s = s.replace(/<\s*script[^>]*>(.|[\r\n])*?<\s*\/script[^>]*>/gi, ''))
  typeof args.removeCss === 'boolean' &&
    args.removeCss === true &&
    (s = s.replace(/<\s*style[^>]*>(.|[\r\n])*?<\s*\/style[^>]*>/gi, ''))
  typeof args.removeATags === 'boolean' &&
    args.removeATags === true &&
    (s = s.replace(/<\s*[a|A][^>]*>(.|[\r\n])*?<\s*\/[a|A][^>]*>/gi, ''))
  typeof args.removeAllTags === 'boolean' &&
    args.removeAllTags === true &&
    (s = s.replace(/<\/?[^>]*>/g,''))
  typeof args.replaceProductsName === 'boolean' &&
    args.replaceProductsName === true &&
    (s = s.replace(/haodf.com|guahao.zjol.com.cn/gi, 'baidu.com'))
  typeof args.replaceProductsName === 'boolean' &&
    args.replaceProductsName === true &&
    (s = s.replace(/好大夫在线|好大夫|春雨医生|杏树林|杏林医生/gi, '点点云科室'))
  s = s.replace(/data\-src="(http:.*?)?(https.*?)?"/g, function(res, $1, $2){
    return $1? 'src="http://read.html5.qq.com/image?src=forum&q=5&r=0&imgflag=7&imageUrl=' + $1 + '"' : 'src=' + $2
  });

  //if (this.fhtml) {
  //  s = s.replace(/<\/?[^>]+>/g, '');
  //  s = s.replace(/\&[a-z]+;/gi, '');
  //  s = s.replace(/\s+/g, '\n');
  //}
  return s
}
//data-src=

export {
  goodTime, date, removeTag, htmlFilter
}