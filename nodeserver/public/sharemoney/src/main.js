//兼容IE10
//if(typeof Promise==="undefined"){
//  window.Promise=function(fun){
//    this.deferreds=[];
//    this.rejects=[];
//    var pms=this;
//    fun(function(resp){pms.resolve(resp)},function(resp){pms.reject(resp)});
//  };
//  Promise.prototype.state="pedding";
//  Promise.prototype.then=function(onResolved,onRejected){
//    switch(this.state)
//    {
//      case "pedding":
//       this.deferreds.push(onResolved);
//       this.rejects.push(onRejected);
//      break;
//      case "fulfilled":
//        if(onResolved)
//        {
//          onResolved=onResolved(this.value);
//          if(onResolved instanceof Promise)
//          {
//            return onResolved;
//          }
//        }
//      break;
//      case "rejected":
//        if(onRejected)
//        {
//          onRejected=onRejected(this.errValue);
//          if(onRejected instanceof Promise)
//          {
//            return onRejected;
//          }
//        }
//      break;
//    }
//    return this;
//  };
//  Promise.prototype["catch"]=function(onRejected){
//    return this.then(null,onRejected);
//  };
//  Promise.resolve=Promise.prototype.resolve=function(resp){
//    if(this===Promise)
//    {
//      return new this(function(f){
//        f(resp);
//      });
//    }
//    var i=0,l=this.deferreds.length;
//    this.state="fulfilled";
//    if(l===0){this.value=resp;}
//    for(;i<l;i++)
//    {
//      if(resp instanceof Promise)
//      {
//        for(;i<l;i++)
//        {
//          resp.then(this.deferreds[i],this.rejects[i]);
//        }
//        break;
//      }
//      else
//      {
//        this.value=resp;
//        resp=this.deferreds[i](this.value);
//      }
//    }
//  };
//   Promise.reject=Promise.prototype.reject=function(resp){
//    if(this===Promise)
//    {
//      return new this(function(a,b){
//          b(resp);
//      });
//    }
//    var i=0,l=this.rejects.length;
//    this.state="rejected";
//    if(l===0){this.errValue=resp;}
//    for(;i<l;i++)
//    {
//      if(resp instanceof Promise)
//      {
//        for(;i<l;i++)
//        {
//          resp.then(this.deferreds[i],this.rejects[i]);
//        }
//        break;
//      }
//      else if(typeof resp!="undefined")
//      {
//        this.errValue=resp;
//        resp=this.rejects[i](this.errValue);
//      }
//    }
//  };
//}


import Vue from 'vue'
import App from './app.vue'
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';
import Element from 'element-ui'
import router from './router/router.js'
import 'element-ui/lib/theme-default/index.css'
import config from './utils/config'
//console.log(window.Promise)
//window.Promise || (
// window.Promise = require("bluebird")
//)


Vue.use(MintUI);

Vue.config.debug = config.testMode
Vue.use(Element)
Vue.component('Copyright', require('./component/copyright.vue'))
let testMode = config.testMode
//testMode || (window.console = {
//  error(){return},
//  log(){return},
//  warn(){return},
//  info(){return},
//  trace(){return}
//})
//vuex
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    count: 0,
    book: 0,
    userInfo: null,
    isLogin: false
  },
  mutations: {
    increment (state) {
      state.count++
    },
    update (state, obj){
      Object.assign(state, obj)
    }
  },
  action:{}
})

const app = new Vue({
  store,
  router,
  ...App
}).$mount('#app')