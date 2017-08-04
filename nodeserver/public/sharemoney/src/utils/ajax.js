require('es6-promise').polyfill()
import Vue from 'vue'
//import axios from 'axios'
import md5 from './md5'
import config from './config'

let testMode = config.testMode
const HOST = testMode ? 'http://plat.weixin.hztywl.cn/app' : '//plat.weixin.diandianys.com/app'
let random=Math.round(Math.random()*10000)
let sign=md5(md5('mFQVSIR4') + 1001 + random)
let isIE9 = !!(navigator.userAgent.indexOf('MSIE 9.0') > -1)

const basePostData = {
  "spid":'1001',
  "channel":'4',
  "sign":sign,
  "format":"JSON",
  "random":random,
  "oper":"127.0.0.1"
}

//axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8'

let ajax=(service,postData)=>{
  let promiseXHR = new Promise((resolve, reject)=>{
    let xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP")
    let body = JSON.stringify({service:service,...basePostData, ...postData})
    xhr.open("POST", HOST, true)
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8")
    xhr.send(body)
    xhr.onreadystatechange=function(){
      if (xhr.readyState==4 && xhr.status>=200 && xhr.status < 400){
        resolve( {'data': JSON.parse(xhr.responseText)} )
      }
    }
  })
  return promiseXHR
  /* 暂停使用axios
   * axios在IE9下不能发送ajax body, 目测是content-type丢失引起的
   * ----marked by: admin@yeernet.com
   */
  //return axios.post(HOST, {service:service, ...basePostData, ...postData })
}
//isIE9 && (ajax.then = ()=>{return})

let XHR = (service, postData)=>{
  let xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP")
  let body = ({service:service,...basePostData, ...postData}).toString()
  xhr.onreadystatechange=function(){
    if (xhr.readyState==4 && xhr.status>=200 && xhr.status < 400){
      return xhr.responseText
    }
  }
  xhr.open("POST", HOST, true)
  xhr.setRequestHeader("Content-type", "application/json;charset=UTF-8")
  xhr.send(body)
}




ajax.host = HOST
ajax.basePostData =basePostData
export default ajax